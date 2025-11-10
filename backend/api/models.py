from django.db import models

# Create your models here.
class User(models.Model):
    full_name=models.CharField(max_length=255, null=False, blank=False)
    email_id=models.EmailField(unique=True, null=False, blank=False, primary_key=True)
    alternative_email_id=models.EmailField(unique=True, null=False, blank=False)
    age=models.PositiveIntegerField(null=False, blank=False)
    
    position=models.CharField(max_length=10)
    contact_no1=models.CharField(max_length=15, null=False, blank=False)
    contact_no2=models.CharField(max_length=15, null=False, blank=False)
    linkedin = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    gender = models.CharField(
        max_length=10,
        choices=[
            ('Male', 'Male'),
            ('Female', 'Female'),
            ('Other', 'Other'),
        ],
        null=False,
        blank=False
    )
    joined_on=models.DateField()
    
    
    
