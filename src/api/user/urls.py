from django.contrib import admin
from django.urls import path
from .views import (
    UserSignupView,
    UserLoginView,
    UserLogoutView,
    UserUpdateView,
    UserRetrieveView,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("", UserRetrieveView.as_view(), name="register"),
    path("register/", UserSignupView.as_view(), name="register"),
    path("edit/", UserUpdateView.as_view(), name="edit"),
    path("login/", UserLoginView.as_view(), name="token_obtain_pair"),
    path("logout/", UserLogoutView.as_view(), name="logout"),
]