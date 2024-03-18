from django.contrib import admin
from .models import Greeting, Qualification, Caregiver, CareReceiver, CareRequest, Rating, Specialization, CustomUser, WorkExperience, FixedUnavailableDay, FixedUnavailableHour, CustomUnavailableDay

admin.site.register(Greeting)
admin.site.register(Qualification)
admin.site.register(Caregiver)
admin.site.register(CareReceiver)
admin.site.register(CareRequest)
admin.site.register(Rating)
admin.site.register(Specialization)
admin.site.register(CustomUser)
admin.site.register(WorkExperience) 
admin.site.register(FixedUnavailableDay)
admin.site.register(FixedUnavailableHour)
admin.site.register(CustomUnavailableDay)
