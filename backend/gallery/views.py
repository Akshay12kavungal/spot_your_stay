from django.shortcuts import render
from rest_framework import viewsets
from .models import GalleryImage
from .serializers import GalleryImageSerializer
from rest_framework import permissions

class GalleryImageViewSet(viewsets.ModelViewSet):
    serializer_class = GalleryImageSerializer
    queryset = GalleryImage.objects.all()
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        """
        Optionally filters the queryset by a specific property ID using the `property` query parameter.
        """
        queryset = GalleryImage.objects.all()
        property_id = self.request.query_params.get('property')
        if property_id:
            queryset = queryset.filter(property_id=property_id)
        return queryset
