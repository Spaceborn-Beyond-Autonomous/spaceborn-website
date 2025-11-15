from django.contrib import admin
from django.urls import path, include
from .views import *
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from django.urls import re_path





urlpatterns = [
    path('sb_admin/', admin.site.urls),
    path('api/', include('api.urls')),  # your backend API routes
    path('check/', check_backend),  # serve frontend
]

# if settings.DEBUG:
#     urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
#     urlpatterns += [
#         re_path(r'^_next/(?P<path>.*)$', serve, {'document_root': settings.FRONTEND_DIR / '_next'}),
#         re_path(r'^(?P<path>.*\.(?:ico|png|jpg|jpeg|svg|webp))$', serve, {'document_root': settings.FRONTEND_DIR}),
#     ]