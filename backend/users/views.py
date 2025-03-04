from rest_framework import viewsets, permissions
from django.contrib.auth.models import User
from .models import UserProfile
from .serializers import UserSerializer, UserProfileSerializer, UserSignupSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework import status

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """Allows fetching user details by username or getting the current authenticated user."""
    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "username"  # Allow lookup by username

    @action(detail=False, methods=['get'])
    def me(self, request):
        """Return the currently authenticated user's details."""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    """Allows fetching profiles by user."""
    
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "user__username"  # Allow lookup by user's username


    @action(detail=False, methods=['get'])
    def me(self, request):
        """Return the authenticated user's profile."""
        profile = UserProfile.objects.get(user=request.user)
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

class RegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        """Handle user signup"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"message": "User registered successfully!", "user_id": user.id})
    

class CurrentUserProfile(APIView):
    def get(self, request):
        print(f"Logged-in user: {request.user}")  # Debugging
        
        # Ensure a profile exists
        profile, created = UserProfile.objects.get_or_create(user=request.user)
        
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)