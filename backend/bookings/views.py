from rest_framework.response import Response
from rest_framework import status, viewsets, permissions
from .models import Booking
from .serializers import BookingSerializer
from django.contrib.auth.models import User

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
                return Response({"error": "Invalid user ID"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            user = self.request.user if self.request.user.is_authenticated else User.objects.get(id=1)

        serializer.save(user=user)

    
