from rest_framework import serializers

from .models import Amenity, Property

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ['id', 'name']  # Include the 'name' field

class PropertySerializer(serializers.ModelSerializer):
    amenities = AmenitySerializer(many=True, read_only=True)
    class Meta:
        model = Property
        fields = "__all__"