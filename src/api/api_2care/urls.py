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
from core.views import GreetingList, CaregiverList, CaregiverEdit, CaregiverSelfCalendarView, CaregiverDetail, CaregiverCalendarView, QualificationCreate, QualificationRetrieveUpdateDestroy, SpecializationListCreateView, SpecializationRetrieveUpdateDestroyView

urlpatterns = [
    path("admin/", admin.site.urls),
    path('greetings/', GreetingList.as_view(), name='greeting-list'),

    path('caregiver', CaregiverList.as_view(), name='caregiver-list'),
    path('caregiver/', CaregiverEdit.as_view(), name='caregiver-edit'),
    path('caregiver/my-calendar', CaregiverSelfCalendarView.as_view(), name='caregiver-self-calendar-view'), 

    path('caregiver/<uuid:pk>', CaregiverDetail.as_view(), name='caregiver-detail'),
    path('caregiver/<uuid:pk>/calendar', CaregiverCalendarView.as_view(), name='caregiver-calendar-view'),
    #path('caregiver/<uuid:pk>/rating', CaregiverRatingView.as_view(), name='caregiver-view-rating'), sem model suficiente.

    #Qualification (Odair)
    path('qualification/', QualificationCreate.as_view(), name='qualification-create'),
    path('qualification/<uuid:pk>/', QualificationRetrieveUpdateDestroy.as_view(), name='qualification-update-delete'),

    ##### Specialization - Leo #####
    path('specialization/', SpecializationListCreateView.as_view(), name='specialization-list'),
    path('specialization/<uuid:pk>/', SpecializationRetrieveUpdateDestroyView.as_view(), name='specialization-list-update-delete'),


]