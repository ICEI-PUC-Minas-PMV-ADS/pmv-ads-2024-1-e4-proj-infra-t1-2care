from django.contrib import admin
from django.urls import path
from .views import (
    MongoCaregiverListView,
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
    SpecializationListCreateView,
    SpecializationRetrieveUpdateDestroyView,
)

urlpatterns = [
    # Caregiver App -> Rotas relacionadas aos Cuidadores
    path("", MongoCaregiverListView.as_view(), name="caregiver-list"),
    path("edit/", CaregiverEditView.as_view(), name="caregiver-edit"),
    path(
        "my-calendar",
        CaregiverSelfCalendarView.as_view(),
        name="caregiver-self-calendar-view",
    ),
    path("<uuid:pk>", CaregiverDetailView.as_view(), name="caregiver-detail"),
    path(
        "<uuid:pk>/calendar",
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
        name="specialization-retrieve-update-delete",
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
