from django.contrib.auth.models import User
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer, UserSerializer
from rest_framework.decorators import action


class RegisterViewSet(ViewSet):
    """
    A ViewSet for user registration and listing.
    """
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        """
        List all registered users.
        """
        users = User.objects.all()
        if not users.exists():
            return Response({"message": "No users found."}, status=status.HTTP_404_NOT_FOUND)
        user_data = [{"id": user.id, "username": user.username, "email": user.email} for user in users]
        return Response(user_data, status=status.HTTP_200_OK)

    def create(self, request):
        """
        Register a new user.
        """
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProtectedView(APIView):
    """
    Example protected endpoint.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "This is a protected route. You are authenticated!"})




class ProfileViewSet(ViewSet):
    """
    A ViewSet for managing user profiles.
    """
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get', 'put'])
    def profile(self, request):
        """
        GET: Retrieve the profile of the authenticated user.
        PUT: Update the profile of the authenticated user.
        """
        user = request.user

        if request.method == "GET":
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method == "PUT":
            serializer = UserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Profile updated successfully!"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)