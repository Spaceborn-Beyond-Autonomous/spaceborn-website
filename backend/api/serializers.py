from rest_framework import serializers
from .models import User, Team, Project, Task, Revenue, Meeting


# 2️⃣ --- User Serializer ---
class UserSerializer(serializers.ModelSerializer):
    team = serializers.StringRelatedField(read_only=True)  # Show team name instead of team ID
    tasks_assigned = serializers.StringRelatedField(many=True, read_only=True)  # Tasks assigned to the user
    password = serializers.CharField(write_only=True, min_length=8, style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = [
            'id',
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
            'assigned_meetings',
            'joined_meetings'
        ]
        extra_kwargs = {
            'password': {'write_only': True},  # don't expose passwords
             'email': {'required': True}
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
            'created_at',
            'assigned_to',
            'project'
        ]

# 4️⃣ --- Project Serializer (Updated for combined model) ---
class ProjectSerializer(serializers.ModelSerializer):
    # Display related fields clearly
    team_detail = serializers.StringRelatedField(source='team', read_only=True)
    members_detail = serializers.StringRelatedField(source='members', many=True, read_only=True)
    tasks = TaskSerializer(many=True, read_only=True)
    
    # ✅ For writing: accept IDs
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), required=False, allow_null=True)
    members = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, required=False)
    class Meta:
        model = Project
        fields = [
            'id', 'name', 'description', 'status', 'created_at'
            'team', 'team_detail',           # ✅ Both ID and name
            'members', 'members_detail',     # ✅ Both IDs and names
            'tasks', 'created_at', 'updated_at'
        ]


# 1️⃣ --- Team Serializer ---
class TeamSerializer(serializers.ModelSerializer):
    # Show user names and projects under each team
    members = serializers.StringRelatedField(many=True, read_only=True)
    projects = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'code', 'name', 'team_members', 'projects']


# 7️⃣ --- Revenue Serializer ---
class RevenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Revenue
        fields = ['id', 'total', 'pending', 'completed', 'period', 'created_at']


class MeetingSerializer(serializers.ModelSerializer):
    team = serializers.StringRelatedField(many=True)       # shows team name instead of id
    members = serializers.StringRelatedField(many=True)  # shows member names instead of ids

    class Meta:
        model = Meeting
        fields = ['id', 'title', 'start_time', 'date', 'link', 'created_at', 'team', 'members', 'additional_members']
