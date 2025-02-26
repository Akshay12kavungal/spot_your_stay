from rest_framework import serializers
from bookings.models import BlockedDate, Booking

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'user', 'property', 'check_in', 'check_out','guests', 'total_amount', 'status']
class BlockedDatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlockedDate
        fields = "__all__"