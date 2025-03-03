from rest_framework import serializers
from bookings.models import BlockedDate, Booking

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"
        extra_kwargs = {
            "advance_amount": {"required": False},
            "total_amount": {"required": False},
        }

class BlockedDatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlockedDate
        fields = "__all__"