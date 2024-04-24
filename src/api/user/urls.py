from django.contrib import admin
from django.urls import path
from .views import (
    UserSignupView,
    UserLoginView,
    UserLogoutView,
)

urlpatterns = [
    path("register/", UserSignupView.as_view(), name="register"),
    path("login/", UserLoginView.as_view(), name="token_obtain_pair"),
    path("logout/", UserLogoutView.as_view(), name="logout"),
]
