from rest_framework import serializers

from bookings.models import Booking
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"

    # If you're sending just the ID of the booking instead of a full object
    booking = serializers.PrimaryKeyRelatedField(queryset=Booking.objects.all())
