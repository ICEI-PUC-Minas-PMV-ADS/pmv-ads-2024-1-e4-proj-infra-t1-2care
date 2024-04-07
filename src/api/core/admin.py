from django.contrib import admin
from .models import (
    QualificationModel,
    CaregiverModel,
    CareReceiverModel,
    CareRequestModel,
    RatingModel,
    SpecializationModel,
    CustomUserModel,
    WorkExperienceModel,
    FixedUnavailableDayModel,
    FixedUnavailableHourModel,
    CustomUnavailableDayModel,
    CareReceiverModel,
    SpecialCareModel,
    SpecialCareUserModel,
)


admin.site.register(QualificationModel)
admin.site.register(CaregiverModel)
admin.site.register(CareReceiverModel)
admin.site.register(CareRequestModel)
admin.site.register(RatingModel)
admin.site.register(SpecializationModel)
admin.site.register(CustomUserModel)
admin.site.register(WorkExperienceModel)
admin.site.register(FixedUnavailableDayModel)
admin.site.register(FixedUnavailableHourModel)
admin.site.register(CustomUnavailableDayModel)
admin.site.register(SpecialCareModel)
admin.site.register(SpecialCareUserModel)
