from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from carousel.views import CarouselVideoViewSet
from gallery.views import GalleryImageViewSet
from properties.views import PropertyViewSet
from bookings.views import BookingViewSet
from users.views import UserLoginView, UserSignupView

# Register ViewSets with the router
router = DefaultRouter()
router.register(r'properties', PropertyViewSet, basename='property')
router.register(r'bookings', BookingViewSet, basename='booking')
router.register(r'carousel', CarouselVideoViewSet, basename='carousel')
router.register(r'gallery', GalleryImageViewSet, basename='gallery')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # Use the router to generate URLs
    path('api/signup/', UserSignupView.as_view(), name='user-signup'),
    path('api/login/', UserLoginView.as_view(), name='user-login'),
]
