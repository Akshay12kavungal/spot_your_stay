from rest_framework import viewsets
from .models import Property
from .serializers import PropertySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

class PropertyViewSet(viewsets.ModelViewSet):
    queryset=Property.objects.all()
    serializer_class=PropertySerializer 
