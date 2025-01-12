from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status,generics
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token  # If you're using TokenAuthentication
from rest_framework.permissions import AllowAny,IsAuthenticated

from properties.models import Property
from properties.serializers import PropertySerializer
from .serializers import UserSerializer
from .models import CustomUser


# Signup View
class UserSignupView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class UserLoginView(APIView):
    permission_classes = [IsAuthenticated]
    # def post(self, request, *args, **kwargs):
    #     email = request.data.get("email")
    #     password = request.data.get("password")

    #     # Authenticate the user
    #     user = authenticate(email=email, password=password)
    #     if user:
    #         # Generate a token for the authenticated user
    #         token, created = Token.objects.get_or_create(user=user)

    #         # Fetch properties and serialize them
    #         properties = Property.objects.all()
    #         properties_serializer = PropertySerializer(properties, many=True)

    #         # Include token and properties data in the response
    #         return Response(
    #             {
    #                 "token": token.key,
    #                 "user": {
    #                     "usename": user.username,
    #                     "email": user.email,
    #                 },
    #                 "properties": properties_serializer.data,
    #             },
    #             status=status.HTTP_200_OK,
    #         )
    #     return Response(
    #         {"error": "Invalid email or password."},
    #         status=status.HTTP_401_UNAUTHORIZED,
    #     )
