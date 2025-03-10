from rest_framework import viewsets, permissions
from django.contrib.auth.models import User
from .models import UserProfile
from .serializers import UserSerializer, UserProfileSerializer, UserSignupSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework import status

from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from .utils import send_otp_via_whatsapp
from .serializers import OTPRequestSerializer, OTPVerifySerializer

from notification.models import Notification

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

        # Create a notification for signup
        Notification.objects.create(user=user, message="Welcome! Your account has been created successfully.")

        return Response({"message": "User registered successfully!", "user_id": user.id})

class CurrentUserProfile(APIView):
    def get(self, request):
        print(f"Logged-in user: {request.user}")  # Debugging
        
        # Ensure a profile exists
        profile, created = UserProfile.objects.get_or_create(user=request.user)
        
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
    

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def request_otp(request):
    serializer = OTPRequestSerializer(data=request.data)
    if serializer.is_valid():
        phone_number = serializer.validated_data['phone_number']
        user_profile = get_object_or_404(UserProfile, phone_number=phone_number)

        user_profile.generate_otp()
        send_otp_via_whatsapp(user_profile.phone_number, user_profile.otp)

        return Response({'message': 'OTP sent via WhatsApp'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def verify_otp(request):
    serializer = OTPVerifySerializer(data=request.data)
    if serializer.is_valid():
        phone_number = serializer.validated_data['phone_number']
        otp = serializer.validated_data['otp']

        user_profile = get_object_or_404(UserProfile, phone_number=phone_number)

        if user_profile.is_otp_valid(otp):
            user_profile.clear_otp()
            token, _ = Token.objects.get_or_create(user=user_profile.user)
            return Response({'message': 'Login successful', 'token': token.key}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid or expired OTP'}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
