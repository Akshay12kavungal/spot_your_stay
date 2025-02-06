from rest_framework import serializers
from bookings.models import Booking

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'user', 'property', 'check_in', 'check_out','guests', 'total_amount', 'status']
