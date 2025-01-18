from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import RegisterSerializer


class RegisterView(APIView):
    """
    View for user registration and user listing.
    """

    def get_permissions(self):
        """
        Set different permissions for GET and POST requests.
        """
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return [AllowAny()]

    def get(self, request):
        """
        List all registered users (restricted to authenticated users).
        """
        users = User.objects.all()
        user_data = [{"id": user.id, "username": user.username, "email": user.email} for user in users]
        return Response(user_data, status=status.HTTP_200_OK)

    def post(self, request):
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
