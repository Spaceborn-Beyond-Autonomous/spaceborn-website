from django.urls import path
from api.views import DashboardView, Admin_UsersView, TaskView, ProjectsView, LoginView, LogoutView, MeetingView, MeetingAttendanceView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from api.views import PasswordResetRequestView, PasswordResetConfirmView
from rest_framework_simplejwt.views import TokenBlacklistView

# Import drf-spectacular views
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

urlpatterns = [
    # Your existing URLs
    path('v1/dashboard/', DashboardView.as_view(), name='dashboard'),
    
    path('v1/users/', Admin_UsersView.as_view(), name='users'),
    path('v1/tasks/', TaskView.as_view(), name='tasks'),
    path('v1/projects/', ProjectsView.as_view(), name='projects'),
    
    path('v1/auth/logout/', LogoutView.as_view(), name='logout'),
    path('v1/auth/login/', LoginView.as_view(), name='login'),
    
    path('v1/meetings/<int:pk>/', MeetingView.as_view(), name='meeting'),
    path('v1/meeting/attendance/', MeetingAttendanceView.as_view(), name='meeting_attendance'),
    path('v1/auth/password-reset/', PasswordResetRequestView.as_view(), name='password-reset'),
    path(
        'v1/auth/password-reset-confirm/<uidb64>/<token>/',
        PasswordResetConfirmView.as_view(),
        name='password-reset-confirm'
    ),
    
    path('v1/auth/verify/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('v1/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('v1/auth/token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    
    # Swagger URLs
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
