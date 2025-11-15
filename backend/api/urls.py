# from django.contrib import admin
from django.urls import path
from api.views import DashboardView, Admin_UsersView, TaskView, ProjectsView, LoginView, LogoutView, MeetingView, MeetingAttendanceView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from api.views import PasswordResetRequestView, PasswordResetConfirmView
from rest_framework_simplejwt.views import TokenBlacklistView

urlpatterns = [
    # path('', UsersView.as_view()),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    
    path('admin/users/', Admin_UsersView.as_view(), name='admin_users'),
    path('admin_core/tasks/', TaskView.as_view(), name='admin_core_tasks'),
    path('admin_core/projects/', ProjectsView.as_view(), name='admin_core_projects'),
    
    path('logout/', LogoutView.as_view(), name='logout'),
    path('login/', LoginView.as_view(), name='login'),
    
    path('meetings/', MeetingView.as_view(), name='meeting'),
    path('meeting/attendance', MeetingAttendanceView.as_view(), name='meeting_attendance'),
    path('auth/password-reset/', PasswordResetRequestView.as_view(), name='password-reset'),
    path(
        'auth/password-reset-confirm/<uidb64>/<token>/',
        PasswordResetConfirmView.as_view(),
        name='password-reset-confirm'
    ),
    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist')
    
]