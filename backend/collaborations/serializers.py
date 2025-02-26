# serializers.py
from rest_framework import serializers
from .models import CollaborationRequest

class CollaborationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollaborationRequest
        fields = ['name', 'email', 'phone', 'message']  # Include the phone field