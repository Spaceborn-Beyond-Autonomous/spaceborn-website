from rest_framework import serializers
from .models import *


# 2️⃣ --- User Serializer ---
class UserSerializer(serializers.ModelSerializer):
    team = serializers.StringRelatedField(read_only=True)  # Show team name instead of team ID
    tasks_assigned = serializers.StringRelatedField(many=True, read_only=True)  # Tasks assigned to the user

    class Meta:
        model = User
        fields = [
            'full_name',
            'email_id',
            'password',
            'alternative_email_id',
            'age',
            'position',
            'contact_no1',
            'contact_no2',
            'linkedin',
            'github',
            'gender',
            'role',
            'joined_on',
            'team',
            'tasks_assigned',
        ]
        extra_kwargs = {
            'password': {'write_only': True}  # don't expose passwords
        }


# 3️⃣ --- Task Serializer ---
class TaskSerializer(serializers.ModelSerializer):
    # Nested representation for related fields
    assigned_to = serializers.StringRelatedField(read_only=True)
    project = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Task
        fields = [
            'id',
            'title',
            'status',
            'deadline',
            'assigned_to',
            'project'
        ]

# 4️⃣ --- Project Serializer (Updated for combined model) ---
class ProjectSerializer(serializers.ModelSerializer):
    # Display related fields clearly
    team = serializers.StringRelatedField(read_only=True)
    members = serializers.StringRelatedField(many=True, read_only=True)
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            'id',
            'name',
            'description',
            'status',
            'team',
            'members',
            'tasks'
        ]


# 1️⃣ --- Team Serializer ---
class TeamSerializer(serializers.ModelSerializer):
    # Show user names and projects under each team
    members = serializers.StringRelatedField(many=True, read_only=True)
    projects = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'code', 'name', 'members', 'projects']


# 7️⃣ --- Revenue Serializer ---
class RevenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Revenue
        fields = ['id', 'total', 'pending', 'completed', 'period']
