from rest_framework import serializers

from .models import FAQ, ContactUs, Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'



class ContactUsSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)  # Auto-generated timestamp

    class Meta:
        model = ContactUs
        fields = ['name', 'email', 'message', 'created_at']

    def create(self, validated_data):
        return ContactUs.objects.create(**validated_data)


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'