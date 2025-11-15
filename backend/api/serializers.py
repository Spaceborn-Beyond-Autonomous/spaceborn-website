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
            # 'password': {'write_only': True},  # don't expose passwords
             'email_id': {'required': True}
        }
        
        def create(self, validated_data):
            password = validated_data.pop('password')
            user = User.objects.create_user(**validated_data)
            user.set_password(password)
            user.save()
            return user

    # ✅ Update logic (hash password if provided)
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        if password:
            instance.set_password(password)

        return super().update(instance, validated_data)


# 3️⃣ --- Task Serializer ---
class TaskSerializer(serializers.ModelSerializer):
    assigned_to_detail = serializers.StringRelatedField(source='assigned_to', read_only=True)
    project_detail = serializers.StringRelatedField(source='project', read_only=True)

    assigned_to = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        required=False,
        allow_null=True
    )
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())

    class Meta:
        model = Task
        fields = [
            'id',
            'title',
            'status',
            'deadline',
            'created_at',
            'updated_at',

            # write fields
            'assigned_to',
            'project',

            # read-only detail fields
            'assigned_to_detail',
            'project_detail',
        ]
        read_only_fields = [
            'assigned_to_detail',
            'project_detail',
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
            'id', 'name', 'description', 'status',
            'team', 'team_detail',           # ✅ Both ID and name
            'members', 'members_detail',     # ✅ Both IDs and names
            'tasks', 'created_at', 'updated_at'
        ]


# 1️⃣ --- Team Serializer ---
class TeamSerializer(serializers.ModelSerializer):
    team_members = serializers.StringRelatedField(many=True, read_only=True)
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
    team_detail = serializers.StringRelatedField(source='team', read_only=True)
    members_detail = serializers.StringRelatedField(source='members', many=True, read_only=True)
    additional_members_detail = serializers.StringRelatedField(source='additional_members', many=True, read_only=True)
    
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())
    members = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, required=False)
    additional_members = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, required=False)

    class Meta:
        model = Meeting
        fields = [
            'id',
            'title',
            'start_time',
            'date',
            'link',
            'created_at',

            # Write fields
            'team',
            'members',
            'additional_members',

            # Read-only detail fields
            'team_detail',
            'members_detail',
            'additional_members_detail',
        ]
        read_only_fields = [
            'team_detail',
            'members_detail',
            'additional_members_detail',
        ]