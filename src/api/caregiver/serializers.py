import re
from django.forms import ValidationError
from rest_framework import serializers
from .models import (
    QualificationModel,
    WorkExperienceModel,
    SpecializationModel,
    FixedUnavailableDayModel,
    FixedUnavailableHourModel,
    CustomUnavailableDayModel,
    CaregiverModel,
    CareRequestModel,
    RatingModel,
)
from user.models import CustomUserModel
from careReceiver.serializers import CareReceiverSerializer
from datetime import datetime

class QualificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = QualificationModel
        fields = "__all__"

    def validate_file(self, value):
        if not isinstance(value, str):
            raise ValidationError("O campo 'file' deve ser uma string.")

        url_regex = re.compile(
            r"^(?:http|ftp)s?://"
            r"(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|"
            r"\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
            r"(?::\d+)?"
            r"(?:/?|[/?]\S+)$",
            re.IGNORECASE,
        )
        if value and not re.match(url_regex, value):
            raise ValidationError("O campo 'file' deve conter um link válido.")

        return value


class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkExperienceModel
        fields = "__all__"


class SpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecializationModel
        fields = "__all__"

        def validate_name(self, value):
            if value not in [choice[0] for choice in SpecializationModel.SPECIALIZATION]:
                raise serializers.ValidationError(
                    "Este não é um valor válido para o campo 'name'."
                )

            return value

class FixedUnavailableDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = FixedUnavailableDayModel
        fields = "__all__"


class FixedUnavailableHourSerializer(serializers.ModelSerializer):
    class Meta:
        model = FixedUnavailableHourModel
        fields = "__all__"


class CustomUnavailableDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUnavailableDayModel
        fields = "__all__"


class CaregiverSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUserModel.objects.all())
    qualifications = QualificationSerializer(many=True, required=False)
    work_exp = WorkExperienceSerializer(many=True, required=False)
    specializations = SpecializationSerializer(many=True, required=False)
    fixed_unavailable_days = FixedUnavailableDaySerializer(many=True, required=False)
    fixed_unavailable_hours = FixedUnavailableHourSerializer(many=True, required=False)
    custom_unavailable_days = CustomUnavailableDaySerializer(many=True, required=False)

    class Meta:
        model = CaregiverModel
        fields = "__all__"

class CareRequestSerializer(serializers.ModelSerializer):
    carereceiver = CareReceiverSerializer()
    class Meta:
        model = CareRequestModel
        fields = "__all__"


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = RatingModel
        fields = "__all__"

class RatingListSerializer(serializers.ModelSerializer):

    care_receiver = serializers.SerializerMethodField()
    
    def get_care_receiver(self, instance):
        carereceiver = instance.care_request.carereceiver.user
        if carereceiver:
            return {"name": carereceiver.name, "picture": carereceiver.picture}
        else:
            return {}

    class Meta:
        model = RatingModel
        fields = ["id", "rating", "description", "care_receiver"]

    
class CalendarSerializer(serializers.ModelSerializer):
    fixed_unavailable_days = serializers.ListField(
        child=serializers.IntegerField(), write_only=True
    )
    fixed_unavailable_hours = serializers.ListField(
        child=serializers.IntegerField(), write_only=True
    )
    custom_unavailable_days = serializers.ListField(
        child=serializers.DateField(), write_only=True
    )

    class Meta:
        model = CaregiverModel
        fields = ['id', 'user', 'fixed_unavailable_days', 'fixed_unavailable_hours', 'custom_unavailable_days']

    def update(self, instance, validated_data):
        fixed_unavailable_days_data = validated_data.pop('fixed_unavailable_days', [])
        fixed_unavailable_hours_data = validated_data.pop('fixed_unavailable_hours', [])
        custom_unavailable_days_data = validated_data.pop('custom_unavailable_days', [])
        today = datetime.now()

        instance.fixed_unavailable_days.clear()
        day_list = [FixedUnavailableDayModel(day=d) for d in fixed_unavailable_days_data]
        fixed_days = FixedUnavailableDayModel.objects.bulk_create(day_list, ignore_conflicts=True)
        instance.fixed_unavailable_days.add(*fixed_days)


        instance.fixed_unavailable_hours.clear()
        hour_list = [FixedUnavailableHourModel(hour=h) for h in fixed_unavailable_hours_data]
        fixed_hours = FixedUnavailableHourModel.objects.bulk_create(hour_list, ignore_conflicts=True)
        instance.fixed_unavailable_hours.add(*fixed_hours)

        instance.custom_unavailable_days.filter(day__gte=today).delete()
        custom_day_list = [CustomUnavailableDayModel(day=d) for d in custom_unavailable_days_data]
        custom_days = CustomUnavailableDayModel.objects.bulk_create(custom_day_list, ignore_conflicts=True)
        instance.custom_unavailable_days.add(*custom_days)

        instance.save()
        return instance