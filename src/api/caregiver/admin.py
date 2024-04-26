from django.contrib import admin
from .models import CaregiverModel, QualificationModel, WorkExperienceModel, SpecializationModel, \
    FixedUnavailableDayModel, FixedUnavailableHourModel, CustomUnavailableDayModel, RatingModel, CareRequestModel

@admin.register(CaregiverModel)
class CaregiverModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'hour_price', 'day_price', 'max_request_km', 'career_time']
    search_fields = ['id', 'user__username', 'user__email']

@admin.register(QualificationModel)
class QualificationModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'conclusion_date']
    search_fields = ['name']

@admin.register(WorkExperienceModel)
class WorkExperienceModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'place', 'start_date', 'end_date']
    search_fields = ['place']

@admin.register(SpecializationModel)
class SpecializationModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']

@admin.register(FixedUnavailableDayModel)
class FixedUnavailableDayModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'day']
    search_fields = ['day']

@admin.register(FixedUnavailableHourModel)
class FixedUnavailableHourModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'hour']
    search_fields = ['hour']

@admin.register(CustomUnavailableDayModel)
class CustomUnavailableDayModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'day']
    search_fields = ['day']

@admin.register(RatingModel)
class RatingModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'care_request', 'rating', 'description']
    search_fields = ['care_request__id']

@admin.register(CareRequestModel)
class CareRequestModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'date', 'start_time', 'end_time', 'total_hours', 'final_price', 'status', 'response_date', 'caregiver', 'carereceiver']
    search_fields = ['id', 'caregiver__user__username', 'carereceiver__user__username']