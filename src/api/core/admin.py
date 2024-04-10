from django.contrib import admin
from .models import Greeting
from .models import Qualification
from .models import Carereceiver

admin.site.register(Greeting)
admin.site.register(Qualification)
admin.site.register(Carereceiver)

