from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .models import CarouselVideo
from .serializers import CarouselVideoSerializer

class CarouselVideoViewSet(viewsets.ModelViewSet):
    queryset = CarouselVideo.objects.all()
    serializer_class = CarouselVideoSerializer

    