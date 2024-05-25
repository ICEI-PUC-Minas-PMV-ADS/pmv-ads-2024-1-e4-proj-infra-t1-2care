from django.contrib import admin
from .models import CareReceiverModel, SpecialCareModel, SpecialCareUserModel


@admin.register(CareReceiverModel)
class CareReceiverModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'user']
    search_fields = ['id', 'user__username', 'user__email']

@admin.register(SpecialCareModel)
class SpecialCareModelAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']

    
@admin.register(SpecialCareUserModel)
class SpecialCareUserModelAdmin(admin.ModelAdmin):
    list_display = ['care_type', "care_receiver", "description"]
    search_fields = ['care_type']

