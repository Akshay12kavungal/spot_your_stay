from rest_framework.response import Response
from rest_framework import status, viewsets, permissions
from .models import BlockedDate, Booking
from .serializers import BlockedDatesSerializer, BookingSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response


from rest_framework import serializers
class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.AllowAny]  # TEMP: Allow anyone to test

    def perform_create(self, serializer):
        user_id = self.request.data.get("user", None)
        if user_id:
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                raise serializers.ValidationError({"user": "Invalid user ID"})
        else:
            user = self.request.user if self.request.user.is_authenticated else User.objects.get(id=1)

        total_amount = self.request.data.get("total_amount", None)
        serializer.save(user=user, total_amount=total_amount if total_amount is not None else 0)

    @action(detail=True, methods=["PATCH"])
    def cancel(self, request, pk=None):
        """Allow users to cancel their bookings"""
        try:
            booking = self.get_object()
            if booking.status == "Cancelled":
                return Response({"detail": "Booking is already cancelled."}, status=400)
            booking.status = "Cancelled"
            booking.save()
            return Response({"detail": "Booking cancelled successfully.", "status": "Cancelled"})
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found."}, status=404)

        
class BlockedDateViewSet(APIView):
    permission_classes = [permissions.AllowAny]  # Adjust permissions as needed

    def get(self, request):
        blocked_dates = BlockedDate.objects.all()
        serializer = BlockedDatesSerializer(blocked_dates, many=True)  # Use correct serializer
        return Response(serializer.data, status=status.HTTP_200_OK)