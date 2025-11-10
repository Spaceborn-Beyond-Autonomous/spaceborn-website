# from django.contrib import admin
from django.urls import path
from api.views import UsersView

urlpatterns = [
    path('', UsersView.as_view()),
]