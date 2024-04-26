from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import CustomTokenObtainPairSerializer, UserUpdateSerializer

from .models import (
    CustomUserModel
)

from .serializers import (
    UserSerializer,
)
UserUpdateSerializer

class UserSignupView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

class UserUpdateView(generics.UpdateAPIView):
    authentication_classes = [JWTAuthentication]
    serializer_class = UserUpdateSerializer
    def get_object(self):
        return self.request.user

    def get_queryset(self):
        return None

class UserRetrieveView(generics.RetrieveAPIView):
    authentication_classes = [JWTAuthentication]
    serializer_class = UserUpdateSerializer
    
    def get_object(self):
        return self.request.user

    def get_queryset(self):
        return None

class UserLoginView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = CustomTokenObtainPairSerializer


class UserLogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)