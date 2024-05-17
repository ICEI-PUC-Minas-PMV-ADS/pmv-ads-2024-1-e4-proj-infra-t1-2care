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
    CaregiverEditView,
    CaregiverCalendarView,
    QualificationListCreateView,
    QualificationRetrieveUpdateDestroyView,
    RatingListView,
    RatingCreateView,
    RatingDetailView,
    RatingAllowCountView,
    SpecializationListCreateView,
    SpecializationRetrieveUpdateDestroyView,
    AddSpecialization,
    RemoveSpecialization,
    WorkExperienceListCreateView,
    WorkExperienceRetrieveUpdateDestroyView,
    CalendarUpdateAPIView,
)

urlpatterns = [
    # Caregiver App -> Rotas relacionadas aos Cuidadores
    path("", CaregiverDetailView.as_view(), name="caregiver-detail"),
    path("list", MongoCaregiverListView.as_view(), name="caregiver-list"),
    path("edit/", CaregiverEditView.as_view(), name="caregiver-edit"),
    path(
        "my-calendar",
        CaregiverSelfCalendarView.as_view(),
        name="caregiver-self-calendar-view",
    ),
    path(
        "<uuid:pk>/calendar",
        CaregiverCalendarView.as_view(),
        name="caregiver-calendar-view",
    ),
    path('calendar/update/', CalendarUpdateAPIView.as_view(), name='caregiver-calendar-update'),
    # path('caregiver/<uuid:pk>/rating', CaregiverRatingView.as_view(), name='caregiver-view-rating'), sem model suficiente.
    path("qualification/", QualificationListCreateView.as_view(), name="qualification-list-create"),
    path(
        "qualification/<uuid:pk>/",
        QualificationRetrieveUpdateDestroyView.as_view(),
        name="qualification-update-delete",
    ),
    path("workExperience/", WorkExperienceListCreateView.as_view(), name="workExperience-list-create"),
    path(
        "workExperience/<uuid:pk>/",
        WorkExperienceRetrieveUpdateDestroyView.as_view(),
        name="workExperience-update-delete",
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
    
    path("ratings", RatingListView.as_view(), name="rating-list"),
    path("ratings/", RatingCreateView.as_view(), name="rating-create"),
    path("ratings/<uuid:pk>/", RatingDetailView.as_view(), name="rating-detail"),
    path("ratings/count", RatingAllowCountView.as_view(), name="rating-allow-count"),
  
    path("add/specialization/", AddSpecialization.as_view(), name="add-specialization"),
    path("remove/specialization/", RemoveSpecialization.as_view(), name="remove-specialization"),

]