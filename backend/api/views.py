from django.shortcuts import render
from .models import *
from rest_framework import generics, status
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import authenticate
from .permissions import *
from rest_framework_simplejwt.tokens import RefreshToken
from api.task import *

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

        if not user.password == password:  # use check_password() if hashed
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        # ✅ Create JWT tokens
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        # ✅ Set cookies
        response = Response({
            "message": "Login successful",
            "access": access_token,
            "refresh": refresh_token
        }, status=status.HTTP_200_OK)

        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,
            secure=True,   # Set True in production (HTTPS)
            samesite='Lax'
        )
        response.set_cookie(
            key='refresh_token', value=refresh_token,
            httponly=True, secure=False, samesite='Lax')

        return response
    
class LogoutView(APIView):
    def post(self, request):
        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response


#Admin functionalities

class Admin_DashboardView(APIView):
    permission_classes = [IsAdminOrCore,IsEmployee]  # Protect with JWT

    def get(self, request):
        # Optionally, ensure only admins can access
        if request.user.role == 'admin':
            # return Response({"error": "Access Denied"}, status=403)

        # Example dashboard data
            total_users = User.objects.count()
            total_teams = Team.objects.count()
            total_tasks = Task.objects.count()
            completed_tasks = Task.objects.filter(status='Completed').count()
            revenue = Revenue.objects.all()

            total_revenue=0
            
            for i in revenue:
                total_revenue+=i.total
                
            return Response({
                "admin": request.user.full_name,
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
                "admin": request.user.full_name,
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
                "admin": request.user.full_name,
                "total_users": total_users,
                "total_teams": total_teams,
                "total_tasks": total_tasks,
                "completed_tasks": completed_tasks
            })
            
    def post(self, request):
        
        if request.user.role == 'admin':
            
            team = request.data.get('team')
            
            serializer = MeetingSerializer(data=request.data)
            additional_members = request.data.get('additional_members', [])
            if serializer.is_valid():
                meeting = serializer.save(team=team)
                all_members = list(team.members.all())
                extra_users = User.objects.filter(email_id__in=additional_members)
                meeting.members.set(all_members + list(extra_users))
                meeting.save()
                
                meeting_reminder.delay(meeting.id)
                for user in meeting.members.all():
                    user.assigned_meetings = (user.assigned_meetings or 0) + 1
                    user.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"error": "Access Denied"}, status=status.HTTP_403_FORBIDDEN)
    
    def put(self, request):
        meeting_id = request.data.get('id')
        if not meeting_id:
            return Response(
                {"error": "Meeting ID is required for update."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            meeting = Meeting.objects.get(id=meeting_id)
        except Meeting.DoesNotExist:
            return Response(
                {"error": f"Meeting with ID {meeting_id} not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = MeetingSerializer(meeting, data=request.data, partial=True)

        # Get new additional members list (IDs)
        additional_members = request.data.get('additional_members', [])

        if serializer.is_valid():
            updated_meeting = serializer.save()

            # Handle updated team
            team = updated_meeting.team
            current_team_members = set(team.members.all())
            current_meeting_members = set(meeting.members.all())

            # Fetch new additional members
            new_additional_users = set(User.objects.filter(id__in=additional_members))
            new_total_members = current_team_members.union(new_additional_users)

            # Find added and removed users
            added_members = new_total_members - current_meeting_members
            removed_members = current_meeting_members - new_total_members

            # ✅ Update meeting membership
            meeting.members.set(new_total_members)
            meeting.save()

            # ✅ Update assigned_meetings counts
            for user in added_members:
                user.assigned_meetings = (user.assigned_meetings or 0) + 1
                user.save()

            for user in removed_members:
                if user.assigned_meetings and user.assigned_meetings > 0:
                    user.assigned_meetings -= 1
                    user.save()

            # ✅ Resend reminders to the updated group
            meeting_reminder.delay(meeting.id)

            return Response(
                {
                    "message": f"Meeting {meeting_id} updated successfully.",
                    "added_members": [u.full_name for u in added_members],
                    "removed_members": [u.full_name for u in removed_members],
                    "meeting": serializer.data
                },
                status=status.HTTP_200_OK
            )

        return Response(
            {"errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

        
    def delete(self, request):
        meeting_id = request.data.get('id')
        if not meeting_id:
            return Response({"error": "Meeting ID is required for deletion."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            meeting = Meeting.objects.get(id=meeting_id)
        except Meeting.DoesNotExist:
            return Response({"error": f"Meeting with ID {meeting_id} not found."}, status=status.HTTP_404_NOT_FOUND)

        # Decrement assigned_meetings count for members
        for member in meeting.members.all():
            if member.assigned_meetings and member.assigned_meetings > 0:
                member.assigned_meetings -= 1
                member.save()

        meeting.delete()
        return Response({"message": f"Meeting {meeting_id} deleted successfully."}, status=status.HTTP_200_OK)
            

        
class Admin_UsersView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        response_data = []

        teams = Team.objects.all()
        for team in teams:
            users = User.objects.filter(team=team)
            serializer = UserSerializer(users, many=True)
            
            response_data.append({
                "team": team.name,
                "members": serializer.data
            })

        # Handle users who have no team (optional)
        no_team_users = User.objects.filter(team__isnull=True)
        if no_team_users.exists():
            serializer = UserSerializer(no_team_users, many=True)
            response_data.append({
                "team": "No Team Assigned",
                "members": serializer.data
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
        serializer = TeamSerializer(tasks, many=True)
        return Response(serializer.data)
    
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
        except Task.DoesNotExist:
            return Response(
                {"error": f"Project with ID {project_id} not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        