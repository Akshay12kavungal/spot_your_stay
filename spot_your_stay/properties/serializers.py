from rest_framework import serializers

from .models import Property

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ['id', 'name', 'description', 'property_type', 'address', 'price', 'amenities', 'image', 'is_active']  

        