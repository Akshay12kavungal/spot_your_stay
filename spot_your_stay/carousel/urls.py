from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CarouselVideoViewSet

router = DefaultRouter()
router.register(r'carouselvideo', CarouselVideoViewSet)

urlpatterns = [
    path('', include(router.urls)),  

]