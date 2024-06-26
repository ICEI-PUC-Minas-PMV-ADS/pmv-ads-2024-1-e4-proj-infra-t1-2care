from django.contrib import admin
from .models import CustomUserModel

@admin.register(CustomUserModel)
class CustomUserModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'email', 'name']