from django.contrib import admin
from .models import CareReceiverModel


@admin.register(CareReceiverModel)
class CareReceiverModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'user']
    search_fields = ['id', 'user__username', 'user__email']
