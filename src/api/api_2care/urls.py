"""
URL configuration for api_2care project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from core.views import (
    CareReceiverCreateView,
    CareReceiverDetailView,
    CareRequestAcceptView,
    CareRequestDeclineView,
    CareRequestDetailView,
    CareRequestListCreateView,
    CaregiverSelfCalendarView,
    CaregiverDetailView,
    CaregiverListView,
    CaregiverEditView,
    CaregiverCalendarView,
    QualificationCreateView,
    QualificationRetrieveUpdateDestroyView,
    RatingCreateView,
    RatingDetailView,
    SpecialCareDetailView,
    SpecialCareListView,
    SpecialCareUserDetailView,
    SpecialCareUserListView,
    SpecializationListCreateView,
    SpecializationRetrieveUpdateDestroyView,
    UserSignupView,
    UserLoginView,
    UserLogoutView,
    MongoUpdate,
    SpecializationListView,

)
from rest_framework import permissions
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="2Care API",
        default_version="v1",
        description="2Care API documentation",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # Core App -> Rotas de Administrador e Utilitários
    path("admin/", admin.site.urls),

    path("mongo/update", MongoUpdate.as_view(), name="mongo-update"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "swagger<format>/", schema_view.without_ui(cache_timeout=0), name="schema-json"
    ),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    # User App -> Rotas relacionadas a autenticação e cadastro dos usuários
    path("register/", UserSignupView.as_view(), name="register"),
    path("login/", UserLoginView.as_view(), name="token_obtain_pair"),
    path("logout/", UserLogoutView.as_view(), name="logout"),
    # Caregiver App -> Rotas relacionadas aos Cuidadores
    path("caregiver", CaregiverListView.as_view(), name="caregiver-list"),
    path("caregiver/", CaregiverEditView.as_view(), name="caregiver-edit"),
    path(
        "caregiver/my-calendar",
        CaregiverSelfCalendarView.as_view(),
        name="caregiver-self-calendar-view",
    ),
    path("caregiver/<uuid:pk>", CaregiverDetailView.as_view(), name="caregiver-detail"),
    path(
        "caregiver/<uuid:pk>/calendar",
        CaregiverCalendarView.as_view(),
        name="caregiver-calendar-view",
    ),
    # path('caregiver/<uuid:pk>/rating', CaregiverRatingView.as_view(), name='caregiver-view-rating'), sem model suficiente.
    path("qualification/", QualificationCreateView.as_view(), name="qualification-create"),
    path(
        "qualification/<uuid:pk>/",
        QualificationRetrieveUpdateDestroyView.as_view(),
        name="qualification-update-delete",
    ),
    path(
        "specialization/",
        SpecializationListCreateView.as_view(),
        name="specialization-list",
    ),
    path(
        "specialization/<uuid:pk>/",
        SpecializationRetrieveUpdateDestroyView.as_view(),
        name="specialization-list-update-delete",
    ),
    # CareReceiver App -> Rotas relacionadas a aqueles que receberão os Cuidados
    path("carereceiver/", CareReceiverCreateView.as_view(), name="carereceiver-create"),
    path(
        "carereceiver/<uuid:pk>",
        CareReceiverDetailView.as_view(),
        name="carereceiver-detail",
    ),
    path("special-care/", SpecialCareListView.as_view(), name="special-care-list"),
    path(
        "special-care/<uuid:pk>/",
        SpecialCareDetailView.as_view(),
        name="special-care-detail",
    ),
    path(
        "special-care-user/",
        SpecialCareUserListView.as_view(),
        name="special-care-user-list",
    ),
    path(
        "special-care-user/<uuid:pk>/",
        SpecialCareUserDetailView.as_view(),
        name="special-care-user-detail",
    ),
    # Services App -> Rotas relacionadas aos serviços e avaliações
    path("requests/", CareRequestListCreateView.as_view(), name="care-request-list-create"),
    path(
        "requests/<uuid:pk>/", CareRequestDetailView.as_view(), name="care-request-detail"
    ),
    path(
        "requests/<uuid:pk>/accept/",
        CareRequestAcceptView.as_view(),
        name="care-request-accept",
    ),
    path(
        "requests/<uuid:pk>/decline/",
        CareRequestDeclineView.as_view(),
        name="care-request-decline",
    ),
    path("ratings/", RatingCreateView.as_view(), name="rating-create"),
    path("ratings/<uuid:pk>/", RatingDetailView.as_view(), name="rating-detail"),
]
