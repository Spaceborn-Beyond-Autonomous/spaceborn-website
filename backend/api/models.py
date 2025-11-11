from django.db import models


# -----------------------
# TEAM MODEL (COMBINED)
# -----------------------
class Team(models.Model):
    code = models.CharField(max_length=5, null=False, blank=False, unique=True)
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)

    # ✅ Direct many-to-many relationship with User
    members = models.ManyToManyField(
        'User',                # reference to the User model
        related_name='teams',  # allows user.teams.all()
        blank=True
    )

    def __str__(self):
        return self.name

# -----------------------
# USER MODEL
# -----------------------
class User(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('core', 'Core'),
        ('employee', 'Employee'),
    ]

    full_name = models.CharField(max_length=255, null=False, blank=False)
    email_id = models.EmailField(unique=True, primary_key=True)
    password = models.CharField(null=False, blank=False)
    alternative_email_id = models.EmailField(unique=True, null=False, blank=False)
    age = models.PositiveIntegerField(null=False, blank=False)
    position = models.CharField(max_length=50, null=True, blank=True)
    contact_no1 = models.CharField(max_length=15, null=False, blank=False)
    contact_no2 = models.CharField(max_length=15, null=True, blank=True)
    linkedin = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    gender = models.CharField(
        max_length=10,
        choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')],
        null=False,
        blank=False
    )
    # photo = models.ImageField(upload_to='profiles/', null=True, blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='employee')
    joined_on = models.DateField()

    # Relationship: User belongs to a team
    # team = models.ForeignKey(
    #     Team,
    #     on_delete=models.SET_NULL,
    #     null=True,
    #     blank=True,
    #     related_name='members'
    # )

    def __str__(self):
        return self.full_name


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

    def __str__(self):
        return f"{self.title} ({self.status})"


# -----------------------
# REVENUE MODEL
# -----------------------
class Revenue(models.Model):
    total = models.FloatField()
    pending = models.FloatField()
    completed = models.FloatField()
    period = models.CharField(max_length=50)

    def __str__(self):
        return f"Revenue ({self.period})"
