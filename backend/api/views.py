from django.shortcuts import render
from django.conf import settings
from django.db import transaction
from django.db.models import F, Sum
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from datetime import date

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import AnonRateThrottle

from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, Team, Project, Task, Meeting, Revenue
from .serializers import *
from .permissions import *
from api.task import *

# -------------------- LOGIN / LOGOUT --------------------
class LoginView(APIView):
    throttle_classes = [AnonRateThrottle]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Always check password even if user doesn't exist
        user = None
        try:
            user = User.objects.get(email_id=email)
        except User.DoesNotExist:
            pass

        if user is None or not user.check_password(password):
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        # JWT tokens
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response = Response({
            "message": "Login successful",
            "access": access_token,
            "refresh": str(refresh),
            "user_role": user.role
        }, status=status.HTTP_200_OK)

        # Optional: set cookies
        response.set_cookie("access_token", access_token, httponly=True, secure=True)
        response.set_cookie("refresh_token", str(refresh), httponly=True, secure=True)

        return response


class LogoutView(APIView):
    def post(self, request):
        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response


# -------------------- PASSWORD RESET --------------------
class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email_id=email)
        except User.DoesNotExist:
            # Avoid revealing whether email exists in DB
            return Response({"message": "If an account with that email exists, a reset link has been sent."})

        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        reset_url = f"{settings.FRONTEND_URL}/{uidb64}/{token}/"

        send_mail(
            subject="Password Reset Request",
            message=f"Click the link to reset your password: {reset_url}",
            from_email="noreply@yourdomain.com",
            recipient_list=[email],
        )

        return Response({"message": "Password reset email sent if user exists."})


class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError, OverflowError):
            return Response({"error": "Invalid reset link."}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)

        new_password = request.data.get('password')
        if not new_password:
            return Response({"error": "Password is required."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({"message": "Password reset successful."})


# -------------------- DASHBOARD --------------------
class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role not in ['admin', 'core']:
            return Response({"error": "Access Denied"}, status=403)

        total_users = User.objects.count()
        total_teams = Team.objects.count()
        total_tasks = Task.objects.count()
        completed_tasks = Task.objects.filter(status='Completed').count()
        total_revenue = Revenue.objects.aggregate(Sum('total'))['total__sum'] or 0

        data = {
            "user": request.user.full_name,
            "total_users": total_users,
            "total_teams": total_teams,
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
        }

        if request.user.role == 'admin':
            data["total_revenue"] = total_revenue

        return Response(data)


# -------------------- MEETINGS --------------------
class MeetingView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        today = date.today()
        meetings = Meeting.objects.filter(date__gte=today).order_by('date', 'start_time')
        serializer = MeetingSerializer(meetings, many=True)
        return Response(serializer.data)

    def post(self, request):
        if request.user.role != 'admin':
            return Response({"error": "Access Denied"}, status=status.HTTP_403_FORBIDDEN)

        team_id = request.data.get('team')
        additional_members = request.data.get('additional_members', [])

        try:
            team = Team.objects.get(id=team_id)
        except Team.DoesNotExist:
            return Response({"error": "Invalid team"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = MeetingSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            meeting = serializer.save(team=team)

            team_members = list(team.members.all())
            extra_users = list(User.objects.filter(email_id__in=additional_members))
            all_members = team_members + extra_users

            meeting.members.set(all_members)

            User.objects.filter(id__in=[u.id for u in all_members]).update(
                assigned_meetings=F('assigned_meetings') + 1
            )

        meeting_reminder.delay(meeting.id)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request):
        if request.user.role != 'admin':
            return Response({"error": "Access Denied"}, status=status.HTTP_403_FORBIDDEN)

        meeting_id = request.data.get('id')
        if not meeting_id:
            return Response({"error": "Meeting ID is required for update."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            meeting = Meeting.objects.get(id=meeting_id)
        except Meeting.DoesNotExist:
            return Response({"error": f"Meeting with ID {meeting_id} not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = MeetingSerializer(meeting, data=request.data, partial=True)
        additional_members = request.data.get('additional_members', [])

        if serializer.is_valid():
            updated_meeting = serializer.save()

            team = updated_meeting.team
            current_team_members = set(team.members.all())
            current_meeting_members = set(meeting.members.all())
            new_additional_users = set(User.objects.filter(email_id__in=additional_members))

            new_total_members = current_team_members.union(new_additional_users)
            added_members = new_total_members - current_meeting_members
            removed_members = current_meeting_members - new_total_members

            meeting.members.set(new_total_members)
            meeting.save()

            for user in added_members:
                user.assigned_meetings = (user.assigned_meetings or 0) + 1
                user.save()
            for user in removed_members:
                if user.assigned_meetings and user.assigned_meetings > 0:
                    user.assigned_meetings -= 1
                    user.save()

            meeting_reminder.delay(meeting.id)

            return Response({
                "message": f"Meeting {meeting_id} updated successfully.",
                "added_members": [u.full_name for u in added_members],
                "removed_members": [u.full_name for u in removed_members],
                "meeting": serializer.data
            }, status=status.HTTP_200_OK)

        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        if request.user.role != 'admin':
            return Response({"error": "Access Denied"}, status=status.HTTP_403_FORBIDDEN)

        meeting_id = request.data.get('id')
        if not meeting_id:
            return Response({"error": "Meeting ID is required for deletion."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            meeting = Meeting.objects.get(id=meeting_id)
        except Meeting.DoesNotExist:
            return Response({"error": f"Meeting with ID {meeting_id} not found."}, status=status.HTTP_404_NOT_FOUND)

        for member in meeting.members.all():
            if member.assigned_meetings and member.assigned_meetings > 0:
                member.assigned_meetings -= 1
                member.save()

        meeting.delete()

        return Response({"message": f"Meeting {meeting_id} deleted successfully."}, status=status.HTTP_200_OK)


class MeetingAttendanceView(APIView):
    permission_classes = [IsAdmin]

    def patch(self, request):
        meeting_id = request.data.get('id')
        email = request.data.get('email_id')

        if not meeting_id or not email:
            return Response({"error": "meeting_id and email_id required"}, status=400)

        try:
            meeting = Meeting.objects.get(id=meeting_id)
            user = User.objects.get(email_id=email)
        except (Meeting.DoesNotExist, User.DoesNotExist):
            return Response({"error": "Invalid meeting or user"}, status=404)

        user.joined_meetings = (user.joined_meetings or 0) + 1
        user.save()

        return Response({"message": f"Attendance marked for {user.full_name}"})


# -------------------- ADMIN USERS --------------------
class Admin_UsersView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        teams = Team.objects.prefetch_related('team_members').all()
        response_data = []

        for team in teams:
            users = team.team_members.all()
            serializer = UserSerializer(users, many=True)
            response_data.append({"team": team.name, "members": serializer.data})

        no_team_users = User.objects.filter(teams__isnull=True)
        if no_team_users.exists():
            response_data.append({
                "team": "No Team Assigned",
                "members": UserSerializer(no_team_users, many=True).data
            })

        return Response(response_data)

    def post(self, request):
        alternative_email_id = request.data.get('alternative_email_id')
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            send_account_credentials.delay(alternative_email_id)
            return Response({"message": "User added successfully", "user": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        email = request.data.get('email_id')
        if not email:
            return Response({"error": "Email ID required to delete user"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email_id=email)
            user.delete()
            return Response({"message": f"User '{email}' deleted successfully."}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": f"No user found with email '{email}'."}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        email = request.data.get('email_id')
        if not email:
            return Response({"error": "email_id required"}, status=400)

        try:
            user = User.objects.get(email_id=email)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        # Update fields
        password = request.data.get('password')
        alternative_email = request.data.get('alternative_email_id')
        full_name = request.data.get('full_name')
        contact1 = request.data.get('contact_no1')
        contact2 = request.data.get('contact_no2')
        linkedin = request.data.get('linkedin')
        github = request.data.get('github')
        gender = request.data.get('gender')
        role = request.data.get('role')
        team_id = request.data.get('team')

        if password:
            user.set_password(password)
        if alternative_email:
            user.alternative_email_id = alternative_email
        if full_name:
            user.full_name = full_name
        if contact1:
            user.contact_no1 = contact1
        if contact2:
            user.contact_no2 = contact2
        if linkedin:
            user.linkedin = linkedin
        if github:
            user.github = github
        if gender:
            user.gender = gender
        if role:
            user.role = role
        if team_id:
            try:
                team = Team.objects.get(id=team_id)
                user.teams.add(team)
            except Team.DoesNotExist:
                return Response({"error": f"Team with ID {team_id} not found."}, status=status.HTTP_400_BAD_REQUEST)

        user.save()
        return Response({"message": f"{user.full_name}'s credentials updated successfully"}, status=status.HTTP_200_OK)


# -------------------- TASKS --------------------
class TaskView(APIView):
    permission_classes = [IsAdminOrCore]

    def get(self, request):
        user = request.user
        if user.role == 'admin':
            tasks = Task.objects.all()
        elif user.role == 'core':
            tasks = Task.objects.filter(project__team__in=user.teams.all())
        else:
            tasks = user.tasks_assigned.all()

        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Task created successfully", "task": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        task_id = request.data.get('id')
        if not task_id:
            return Response({"error": "Task ID is required for update."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return Response({"error": f"Task with ID {task_id} not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": f"Task {task_id} updated successfully.", "task": serializer.data}, status=status.HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        task_id = request.data.get('id')
        if not task_id:
            return Response({"error": "Task ID is required for deletion."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            task = Task.objects.get(id=task_id)
            task.delete()
            return Response({"message": f"Task {task_id} deleted successfully."}, status=status.HTTP_200_OK)
        except Task.DoesNotExist:
            return Response({"error": f"Task with ID {task_id} not found."}, status=status.HTTP_404_NOT_FOUND)


# -------------------- PROJECTS --------------------
class ProjectsView(APIView):
    permission_classes = [IsAdminOrCore]

    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Project created successfully", "project": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        project_id = request.data.get('id')
        if not project_id:
            return Response({"error": "Project ID is required for update."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            return Response({"error": f"Project with ID {project_id} not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProjectSerializer(project, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": f"Project {project_id} updated successfully.", "project": serializer.data}, status=status.HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        project_id = request.data.get('id')
        if not project_id:
            return Response({"error": "Project ID is required for deletion."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            project = Project.objects.get(id=project_id)
            project.delete()
            return Response({"message": f"Project {project_id} deleted successfully."}, status=status.HTTP_200_OK)
        except Project.DoesNotExist:
            return Response({"error": f"Project with ID {project_id} not found."}, status=status.HTTP_404_NOT_FOUND)
