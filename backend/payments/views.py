from rest_framework import viewsets
from bookings.models import Booking
from .models import Payment
from .serializers import PaymentSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

    def create(self, request, *args, **kwargs):
        booking_id = request.data.get('booking')
        # Validate the booking ID (if necessary)
        try:
            booking = Booking.objects.get(id=booking_id)
        except Booking.DoesNotExist:
            return Response({"detail": "Booking not found"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Now proceed to create the payment
        return super().create(request, *args, **kwargs)

    
