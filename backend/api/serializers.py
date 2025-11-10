from rest_framework import serializers
from .models import User


class UsersSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('full_name', 'email_id' , 'alternative_email_id', 'age', 'position', 'contact_no1', 'contact_no2',
                   'linkedin', 'github', 'gender', 'joined_on')