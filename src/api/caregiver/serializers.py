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