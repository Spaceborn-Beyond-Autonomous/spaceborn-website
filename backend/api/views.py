from django.shortcuts import render
from .models import User
from rest_framework import generics
from .serializers import UsersSerializers
from rest_framework.response import Response
from rest_framework.decorators import api_view


# @get_view([GET])
class UsersView(generics.CreateAPIView):
    users=User.objects.all()
    serializer_class = UsersSerializers



