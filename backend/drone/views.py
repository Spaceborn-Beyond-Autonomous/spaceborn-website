from django.views.generic import View
from django.http import JsonResponse


def get(self, request):
    return JsonResponse({"message": "Backend is working fine"})  # the one from frontend/out
