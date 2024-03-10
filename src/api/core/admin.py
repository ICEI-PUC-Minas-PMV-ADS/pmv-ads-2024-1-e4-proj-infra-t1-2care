from django.contrib import admin
from .models import Greeting
from .models import Qualification

admin.site.register(Greeting)
admin.site.register(Qualification)

