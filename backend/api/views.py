from django.shortcuts import render
from .models import User
from rest_framework import generics
from .serializers import UsersSerializers


class UsersView(generics.CreateAPIView):
    users=User.objects.all()
    serializer_class = UsersSerializers



