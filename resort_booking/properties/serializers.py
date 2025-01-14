from rest_framework import serializers
from .models import Property

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'
        extra_kwargs = {"url": {"lookup_field": "pk"}}  # Adding extra kwargs for URL lookup
