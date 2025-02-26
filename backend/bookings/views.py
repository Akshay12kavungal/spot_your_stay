from rest_framework.response import Response
from rest_framework import status, viewsets, permissions
from .models import Booking
from .serializers import BookingSerializer
from django.contrib.auth.models import User

from rest_framework import serializers

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.AllowAny]  # TEMP: Allow anyone to test

    def perform_create(self, serializer):
        # Assign a default user if none is provided
        user_id = self.request.data.get("user", None)
        if user_id:
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                raise serializers.ValidationError({"user": "Invalid user ID"})
        else:
            user = self.request.user if self.request.user.is_authenticated else User.objects.get(id=1)

        # Save total_amount explicitly
        total_amount = self.request.data.get("total_amount", None)
        if total_amount is not None:
            serializer.save(user=user, total_amount=total_amount)
        else:
            serializer.save(user=user)

        
