from django.shortcuts import render
from .models import User, Team, Project, Task, Meeting, Revenue
from rest_framework import status
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import authenticate
from .permissions import *
from rest_framework_simplejwt.tokens import RefreshToken
from api.task import *
from datetime import date
from django.db.models import Sum

from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode

# class UsersView(generics.ListAPIView):
#     permission_classes = [IsAuthenticated]

#     users=User.objects.all()
#     serializer_class = UserSerializer

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email_id=email)
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.check_password(password):
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        # ✅ Create JWT tokens
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        # ✅ Set cookies
        response = Response({
            "message": "Login successful",
            "access": access_token,
            "refresh": str(refresh),
            "user_role": user.role
        }, status=status.HTTP_200_OK)

        return response
    
class LogoutView(APIView):
    def post(self, request):
        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response



class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Avoid revealing whether email exists in DB
            return Response({"message": "If an account with that email exists, a reset link has been sent."})

        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        reset_url = f"http://your-frontend-domain/auth/password-reset-confirm/{uidb64}/{token}/"

        # Send email with reset link (customize as needed)
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


#Admin functionalities

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]  # Protect with JWT

    def get(self, request):
        # Optionally, ensure only admins can access
        if request.user.role == 'admin':
            # return Response({"error": "Access Denied"}, status=403)

        # Example dashboard data
            total_users = User.objects.count()
            total_teams = Team.objects.count()
            total_tasks = Task.objects.count()
            completed_tasks = Task.objects.filter(status='Completed').count()
            # revenue = Revenue.objects.all()

            total_revenue = Revenue.objects.aggregate(Sum('total'))['total__sum'] or 0
            
                
            return Response({
                "user": request.user.full_name,
                "total_users": total_users,
                "total_teams": total_teams,
                "total_tasks": total_tasks,
                "completed_tasks": completed_tasks,
                "total_revenue": total_revenue
            })
        
        elif request.user.role == 'core':
            
            total_users = User.objects.count()
            total_teams = Team.objects.count()
            total_tasks = Task.objects.count()
            completed_tasks = Task.objects.filter(status='Completed').count()

            return Response({
                "user": request.user.full_name,
                "total_users": total_users,
                "total_teams": total_teams,
                "total_tasks": total_tasks,
                "completed_tasks": completed_tasks
            }) 
            
        else:
            
            total_users = User.objects.count()
            total_teams = Team.objects.count()
            total_tasks = Task.objects.count()
            completed_tasks = Task.objects.filter(status='Completed').count()

            return Response({
                "user": request.user.full_name,
                "total_users": total_users,
                "total_teams": total_teams,
                "total_tasks": total_tasks,
                "completed_tasks": completed_tasks
            })
        
        
                
class MeetingView(APIView):
    permission_classes = [IsAdmin]

    # -------------------- GET: Fetch Meetings --------------------
    def get(self, request):
        """Return all upcoming and ongoing meetings with members."""
        today = date.today()
        meetings = Meeting.objects.filter(date__gte=today).order_by('date', 'start_time')
        serializer = MeetingSerializer(meetings, many=True)
        return Response(serializer.data)


    # -------------------- POST: Create Meeting (Dashboard) --------------------
    def post(self, request):
        """Create a meeting from Dashboard (Admin only)."""

        if request.user.role == 'admin':

            team = request.data.get('team')
            serializer = MeetingSerializer(data=request.data)

            additional_members = request.data.get('additional_members', [])

            if serializer.is_valid():
                meeting = serializer.save(team=team)

                # Default team members
                all_members = list(team.members.all())

                # Additional members from emails
                extra_users = User.objects.filter(email_id__in=additional_members)

                # Set meeting members
                meeting.members.set(all_members + list(extra_users))
                meeting.save()

                # Send reminders
                meeting_reminder.delay(meeting.id)

                # Update assigned_meetings count
                for user in meeting.members.all():
                    user.assigned_meetings = (user.assigned_meetings or 0) + 1
                    user.save()

                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"error": "Access Denied"}, status=status.HTTP_403_FORBIDDEN)


    # -------------------- PUT: Update Meeting --------------------
    def put(self, request):

        if request.user.role == 'admin':

            meeting_id = request.data.get('id')
            if not meeting_id:
                return Response({"error": "Meeting ID is required for update."},
                                status=status.HTTP_400_BAD_REQUEST)

            try:
                meeting = Meeting.objects.get(id=meeting_id)
            except Meeting.DoesNotExist:
                return Response({"error": f"Meeting with ID {meeting_id} not found."},
                                status=status.HTTP_404_NOT_FOUND)

            serializer = MeetingSerializer(meeting, data=request.data, partial=True)

            additional_members = request.data.get('additional_members', [])

            if serializer.is_valid():
                updated_meeting = serializer.save()

                team = updated_meeting.team
                current_team_members = set(team.members.all())
                current_meeting_members = set(meeting.members.all())

                new_additional_users = set(User.objects.filter(id__in=additional_members))

                new_total_members = current_team_members.union(new_additional_users)

                added_members = new_total_members - current_meeting_members
                removed_members = current_meeting_members - new_total_members

                meeting.members.set(new_total_members)
                meeting.save()

                # Update assigned_meetings
                for user in added_members:
                    user.assigned_meetings = (user.assigned_meetings or 0) + 1
                    user.save()

                for user in removed_members:
                    if user.assigned_meetings and user.assigned_meetings > 0:
                        user.assigned_meetings -= 1
                        user.save()

                # Send updated reminders
                meeting_reminder.delay(meeting.id)

                return Response(
                    {
                        "message": f"Meeting {meeting_id} updated successfully.",
                        "added_members": [u.full_name for u in added_members],
                        "removed_members": [u.full_name for u in removed_members],
                        "meeting": serializer.data
                    }, status=status.HTTP_200_OK
                )

            return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


    # -------------------- DELETE: Delete Meeting --------------------
    def delete(self, request):

        if request.user.role == 'admin':

            meeting_id = request.data.get('id')
            if not meeting_id:
                return Response({"error": "Meeting ID is required for deletion."},
                                status=status.HTTP_400_BAD_REQUEST)

            try:
                meeting = Meeting.objects.get(id=meeting_id)
            except Meeting.DoesNotExist:
                return Response({"error": f"Meeting with ID {meeting_id} not found."},
                                status=status.HTTP_404_NOT_FOUND)

            # Decrement assigned_meetings
            for member in meeting.members.all():
                if member.assigned_meetings and member.assigned_meetings > 0:
                    member.assigned_meetings -= 1
                    member.save()

            meeting.delete()

            return Response(
                {"message": f"Meeting {meeting_id} deleted successfully."},
                status=status.HTTP_200_OK
            )


# -------------------- SEPARATE ENDPOINT FOR ATTENDANCE --------------------
class MeetingAttendanceView(APIView):
    permission_classes=[IsAdmin]
    def patch(self, request):
        """Mark attendance for a user in a meeting."""
        meeting_id = request.data.get('id')
        email = request.data.get('email_id')

        if not meeting_id or not email:
            return Response({"error": "meeting_id and email_id required"}, status=400)

        try:
            meeting = Meeting.objects.get(id=meeting_id)
            user = User.objects.get(email_id=email)
        except (Meeting.DoesNotExist, User.DoesNotExist):
            return Response({"error": "Invalid meeting or user"}, status=404)

        user.joined_meetings += 1
        user.save()

        return Response({"message": f"Attendance marked for {user.full_name}"})



class Admin_UsersView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        teams = Team.objects.prefetch_related('team_members').all()
        response_data = []
        
        for team in teams:
            users = team.team_members.all()  # ✅ ManyToMany relationship
            serializer = UserSerializer(users, many=True)
            response_data.append({
                "team": team.name,
                "members": serializer.data
            })
        
        # Users not in any team
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
          
            account_credentials.delay(alternative_email_id)
        
            return Response(
                {"message": "User added successfully", "user": serializer.data},
                status=status.HTTP_201_CREATED)
            
        return Response(
            {"errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        email = request.data.get('email_id')

        if not email:
            return Response(
                {"error": "Email ID required to delete user"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email_id=email)
            user.delete()  # 👈 This line actually deletes the record from DB
            return Response(
                {"message": f"User '{email}' deleted successfully."},
                status=status.HTTP_200_OK
            )
        except User.DoesNotExist:
            return Response(
                {"error": f"No user found with email '{email}'."},
                status=status.HTTP_404_NOT_FOUND
            )
        
    def put(self, request):
        email = request.data.get('email_id')
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
        
        user = User.objects.get(email_id=email)
        
        if password:
            user.set_password(password)  # secure password hashing
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
                user.team = team
            except Team.DoesNotExist:
                return Response(
                    {"error": f"Team with ID {team_id} not found."},
                    status=status.HTTP_400_BAD_REQUEST
                )

        user.save()

        return Response(
            {"message": f"{user.full_name}'s credentials updated successfully"},
            status=status.HTTP_200_OK
        )
        

class TaskView(APIView):
    permission_classes =[IsAdminOrCore]
    
    def get(self, request): 
        
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    # user = request.user
    
    # if user.role == 'admin':
    #     tasks = Task.objects.all()
    # elif user.role == 'core':
    #     tasks = Task.objects.filter(project__team__in=user.teams.all())
    # else:  # employee
    #     tasks = user.tasks_assigned.all()
    
    # serializer = TaskSerializer(tasks, many=True)
    # return Response(serializer.data)
    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Task created successfully", "task": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    # ✅ PUT — Update an existing task (by ID)
    def put(self, request):
        task_id = request.data.get('id')
        if not task_id:
            return Response(
                {"error": "Task ID is required for update."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return Response(
                {"error": f"Task with ID {task_id} not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": f"Task {task_id} updated successfully.", "task": serializer.data},
                status=status.HTTP_200_OK
            )
        return Response(
            {"errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    # ✅ DELETE — Delete a task by ID
    def delete(self, request):
        task_id = request.data.get('id')
        if not task_id:
            return Response(
                {"error": "Task ID is required for deletion."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            task = Task.objects.get(id=task_id)
            task.delete()
            return Response(
                {"message": f"Task {task_id} deleted successfully."},
                status=status.HTTP_200_OK
            )
        except Task.DoesNotExist:
            return Response(
                {"error": f"Task with ID {task_id} not found."},
                status=status.HTTP_404_NOT_FOUND
            )
            
        
class ProjectsView(APIView):
    permission_classes =[IsAdminOrCore]
    
    def get(self, request): 
        
        tasks = Project.objects.all()
        serializer = ProjectSerializer(tasks, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Project created successfully", "project": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    # ✅ PUT — Update an existing task (by ID)
    def put(self, request):
        project_id = request.data.get('id')
        if not project_id:
            return Response(
                {"error": "Project ID is required for update."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            task = Project.objects.get(id=project_id)
        except  Project.DoesNotExist:
            return Response(
                {"error": f"Project with ID {project_id} not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ProjectSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": f"Project {project_id} updated successfully.", "project": serializer.data},
                status=status.HTTP_200_OK
            )
        return Response(
            {"errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    # ✅ DELETE — Delete a task by ID
    def delete(self, request):
        project_id = request.data.get('id')
        if not project_id:
            return Response(
                {"error": "Task ID is required for deletion."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            project = Project.objects.get(id=project_id)
            project.delete()
            return Response(
                {"message": f"Project {project_id} deleted successfully."},
                status=status.HTTP_200_OK
            )
        except Project.DoesNotExist:
            return Response(
                {"error": f"Project with ID {project_id} not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        