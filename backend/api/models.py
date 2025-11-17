from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.hashers import make_password


class CustomUserManager(BaseUserManager):
    def create_user(self, email_id, full_name, password=None, **extra_fields):
        if not email_id:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email_id)
        user = self.model(email=email, full_name=full_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email_id, full_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email_id, full_name, password, **extra_fields)


# -----------------------
# TEAM MODEL (COMBINED)
# -----------------------
class Team(models.Model):
    code = models.CharField(max_length=5, null=False, blank=False, unique=True)
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)

    # ✅ Direct many-to-many relationship with User
    team_members = models.ManyToManyField(
        'User',                # reference to the User model
        related_name='teams',  # allows user.teams.all()
        blank=True
        # null=True
    )

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'teams'  # Custom table name

# -----------------------
# USER MODEL
# -----------------------
class User(AbstractUser):
    
    username = None
    email_id = models.EmailField(unique=True)
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('core', 'Core'),
        ('employee', 'Employee'),
    ]

    USERNAME_FIELD = 'email_id'  # ✅ Login with email
    REQUIRED_FIELDS = ['full_name']  # ✅ Required for createsuperuser
    
    full_name = models.CharField(max_length=255, null=False, blank=False)
    
    # Make these fields nullable
    alternative_email_id = models.EmailField(unique=True, null=True, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    position = models.CharField(max_length=50, null=True, blank=True)
    contact_no1 = models.CharField(max_length=15, null=True, blank=True)
    contact_no2 = models.CharField(max_length=15, null=True, blank=True)
    linkedin = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    gender = models.CharField(
        max_length=10,
        choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')],
        null=True,
        blank=True
    )
    # photo = models.ImageField(upload_to='profiles/', null=True, blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='employee')
    joined_on = models.DateField(null=True, blank=True)
    
    assigned_meetings = models.IntegerField(default=0)
    joined_meetings = models.IntegerField(default=0)
    
    groups = models.ManyToManyField(
    'auth.Group',
    related_name='api_users_groups',
    blank=True
)

    user_permissions = models.ManyToManyField(
    'auth.Permission',
    related_name='api_users_permissions',
    blank=True
)

    objects = CustomUserManager()  # Add custom manager

    def __str__(self):
        return self.full_name

    class Meta:
        db_table = 'users'  # Custom table name

# -----------------------
# PROJECT MODEL (COMBINED)
# -----------------------
class Project(models.Model):
    STATUS_CHOICES = [
        ('Running', 'Running'),
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
    ]

    name = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # Optional: assign project to a team
    team = models.ForeignKey(
        Team,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='projects'
    )

    # ✅ Instead of a separate ProjectAssignment model:
    # Many users can be assigned to one project directly
    members = models.ManyToManyField(
        'User',
        related_name='projects',
        blank=True
    )

    def __str__(self):
        return f"{self.name} ({self.status})"

    class Meta:
        db_table = 'projects'  # Custom table name

# -----------------------
# TASK MODEL
# -----------------------
class Task(models.Model):
    STATUS_CHOICES = [
        ('Not Started', 'Not Started'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    ]

    title = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Not Started')
    deadline = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    assigned_to = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='tasks_assigned'
    )
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='tasks'
    )
    
    class Meta:
        db_table = 'tasks'  # Custom table name
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['deadline']),
            models.Index(fields=['project', 'status']),  # ✅ Composite index
        ]
        ordering = ['-deadline']  # ✅ Default ordering


    def __str__(self):
        return f"{self.title} ({self.status})"


# -----------------------
# REVENUE MODEL
# -----------------------
class Revenue(models.Model):
    
    total = models.DecimalField(max_digits=12, decimal_places=2)  # ✅ Exact precision
    pending = models.DecimalField(max_digits=12, decimal_places=2)
    completed = models.DecimalField(max_digits=12, decimal_places=2)
    period = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Revenue ({self.period})"

    class Meta:
        db_table = 'revenue'  # Custom table name

class Meeting(models.Model):
    title = models.CharField(max_length=100, null=False, blank=False)
    start_time = models.TimeField(null=False, blank=False)
    date = models.DateField(null=False, blank=False)
    link = models.URLField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    # Each meeting belongs to one team
    team = models.ForeignKey(
        Team,
        on_delete=models.CASCADE,
        related_name='meetings'
    )

    # Many users can attend one meeting
    members = models.ManyToManyField(
        User,
        related_name='meetings_attended',
        # on_delete=models.CASCADE,
        blank=True                       # allows empty members list initially
    )
    
    additional_members = models.ManyToManyField(
        User,
        related_name='extra_meetings_attended',
        # on_delete=models.CASCADE,
        blank=True
        # null=True# allows empty members list initially
    )

    def __str__(self):
        return f"{self.title} - {self.team.name} ({self.date})" 

    class Meta:
        db_table = 'meetings'  # Custom table name
