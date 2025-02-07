from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import FAQ, ContactUs, Review
from .serializers import ContactUsSerializer, FAQSerializer, ReviewSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class ContactUsViewSet(viewsets.ModelViewSet):
    """ViewSet for handling Contact Us form submissions."""
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer
    permission_classes = [permissions.AllowAny]  # Allow public access

    def create(self, request, *args, **kwargs):
        """Handle Contact Us form submissions."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        contact = serializer.save()
        return Response({"message": "Message received successfully!", "contact_id": contact.id}, status=status.HTTP_201_CREATED)


# FAQs API - Allow anyone to view FAQs
class FAQListViewSet(viewsets.ModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

    