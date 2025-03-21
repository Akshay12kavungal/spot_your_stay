from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterViewSet, UserViewSet, ProfileViewSet

router = DefaultRouter()
router.register(r'register', RegisterViewSet, basename='register')
router.register(r'users', UserViewSet, basename='users')
router.register(r'profile', ProfileViewSet, basename='profile')

urlpatterns = [
    path('', include(router.urls)),
    
]
