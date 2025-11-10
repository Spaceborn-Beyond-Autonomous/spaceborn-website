# from django.contrib import admin
from django.urls import path
from api.views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # path('', UsersView.as_view()),
    path('admin/dashboard/', Admin_DashboardView.as_view(), name='admin_dashboard'),
    path('admin/users/', Admin_UsersView.as_view(), name='admin-users'),
    path('higher_tasks/', TaskView.as_view(), name='admin_core_tasks'),
    path('higher_projects/', ProjectsView.as_view(), name='admin_core_projects'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('login/', LoginView.as_view(), name='login')
    
]