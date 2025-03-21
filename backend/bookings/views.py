from rest_framework.response import Response
from rest_framework import status, viewsets, permissions
from .models import BlockedDate, Booking
from .serializers import BlockedDatesSerializer, BookingSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework import serializers

from notification.models import Notification

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
        booking = serializer.save(user=user, total_amount=total_amount if total_amount is not None else 0)

        # Create a notification for the booking
        Notification.objects.create(user=user, message=f"Your booking #{booking.id} has been confirmed.")

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["PATCH"])
    def cancel(self, request, pk=None):
        """Allow users to cancel their bookings"""
        try:
            booking = self.get_object()
            if booking.status == "Cancelled":
                return Response({"detail": "Booking is already cancelled."}, status=400)
            booking.status = "Cancelled"
            booking.save()

            # Create a notification for the cancellation
            Notification.objects.create(user=booking.user, message=f"Your booking #{booking.id} has been cancelled.")

            return Response({"detail": "Booking cancelled successfully.", "status": "Cancelled"})
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found."}, status=404)

    def partial_update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            booking = serializer.save()

            # Create a notification for the update
            Notification.objects.create(user=booking.user, message=f"Your booking #{booking.id} has been updated.")

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found."}, status=status.HTTP_404_NOT_FOUND)
        except serializers.ValidationError as e:
            return Response({"error": e.detail}, status=status.HTTP_400_BAD_REQUEST)
class BlockedDateViewSet(APIView):
    permission_classes = [permissions.AllowAny]  # Adjust permissions as needed

    def get(self, request):
        blocked_dates = BlockedDate.objects.all()
        serializer = BlockedDatesSerializer(blocked_dates, many=True)  # Use correct serializer
        return Response(serializer.data, status=status.HTTP_200_OK)