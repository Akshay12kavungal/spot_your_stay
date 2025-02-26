from django.shortcuts import render
from rest_framework import permissions

# Create your views here.

from rest_framework import viewsets

from .serializers import CollaborationRequestSerializer

from .models import CollaborationRequest

class CollaborationViewset(viewsets.ModelViewSet):
    queryset = CollaborationRequest.objects.all()
    serializer_class = CollaborationRequestSerializer
    permission_classes = [permissions.AllowAny]

