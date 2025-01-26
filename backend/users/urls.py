from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterViewSet, ProtectedView, ProfileViewSet

router = DefaultRouter()
router.register(r'register', RegisterViewSet, basename='register')
router.register(r'profile', ProfileViewSet, basename='profile')  # ProfileViewSet registered here

urlpatterns = [
    path('', include(router.urls)),
]
