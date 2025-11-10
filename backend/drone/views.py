from django.views.generic import View
from django.shortcuts import render

class FrontendAppView(View):
    def get(self, request):
        return render(request, "index.html")  # the one from frontend/out
