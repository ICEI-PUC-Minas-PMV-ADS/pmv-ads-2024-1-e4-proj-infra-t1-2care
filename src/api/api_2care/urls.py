from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    # Core App -> Rotas de Administrador e Utilitários
    path("admin/", admin.site.urls),
    path('api/core/', include('core.urls')),
    path('api/caregiver/', include('caregiver.urls')),
    path('api/careReceiver/', include('careReceiver.urls')),
    path('api/user/', include('user.urls')),
]
