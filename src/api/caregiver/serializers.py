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
from careReceiver.models import SpecialCareUserModel
from user.serializers import UserPendingRequestsSerializer, UserAcceptedRequestsSerializer
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
            raise serializers.ValidationError("Este não é um valor válido para o campo 'name'.")
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

    def update(self, instance, validated_data):
        qualifications_data = validated_data.pop('qualifications', None)
        work_exp_data = validated_data.pop('work_exp', None)
        specializations_data = validated_data.pop('specializations', None)
        fixed_unavailable_days_data = validated_data.pop('fixed_unavailable_days', None)
        fixed_unavailable_hours_data = validated_data.pop('fixed_unavailable_hours', None)
        custom_unavailable_days_data = validated_data.pop('custom_unavailable_days', None)

        # Update caregiver fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Update qualifications
        if qualifications_data is not None:
            instance.qualifications.clear()
            for qualification_data in qualifications_data:
                qualification, created = QualificationModel.objects.get_or_create(**qualification_data)
                instance.qualifications.add(qualification)

        # Update work experience
        if work_exp_data is not None:
            instance.work_exp.clear()
            for work_exp in work_exp_data:
                work_experience, created = WorkExperienceModel.objects.get_or_create(**work_exp)
                instance.work_exp.add(work_experience)

        # Update specializations
        if specializations_data is not None:
            instance.specializations.clear()
            for specialization_data in specializations_data:
                specialization, created = SpecializationModel.objects.get_or_create(**specialization_data)
                instance.specializations.add(specialization)

        # Update fixed unavailable days
        if fixed_unavailable_days_data is not None:
            instance.fixed_unavailable_days.clear()
            for day_data in fixed_unavailable_days_data:
                fixed_day, created = FixedUnavailableDayModel.objects.get_or_create(**day_data)
                instance.fixed_unavailable_days.add(fixed_day)

        # Update fixed unavailable hours
        if fixed_unavailable_hours_data is not None:
            instance.fixed_unavailable_hours.clear()
            for hour_data in fixed_unavailable_hours_data:
                fixed_hour, created = FixedUnavailableHourModel.objects.get_or_create(**hour_data)
                instance.fixed_unavailable_hours.add(fixed_hour)

        # Update custom unavailable days
        if custom_unavailable_days_data is not None:
            instance.custom_unavailable_days.clear()
            for custom_day_data in custom_unavailable_days_data:
                custom_day, created = CustomUnavailableDayModel.objects.get_or_create(**custom_day_data)
                instance.custom_unavailable_days.add(custom_day)

        instance.save()
        return instance

class UserCaregiverRequestsSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = CaregiverModel
        fields = ["user"]

    def get_user_serializer(self, instance):
        if self.context.get('status', None) == 2:
            return UserAcceptedRequestsSerializer
        else:
            return UserPendingRequestsSerializer
     
    def get_user(self, instance):
        UserSerializer = self.get_user_serializer(instance)
        return UserSerializer(instance.user).data

class UserCareReceiverRequestsSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    special_care = serializers.SerializerMethodField()
    class Meta:
        model = CaregiverModel
        fields = ["user", "special_care"]

    def get_user_serializer(self, instance):
        if self.context.get('status', None) == 2:
            return UserAcceptedRequestsSerializer
        else:
            return UserPendingRequestsSerializer
     
    def get_user(self, instance):
        UserSerializer = self.get_user_serializer(instance)
        return UserSerializer(instance.user).data

    def get_special_care(self, instance):
        if instance.share_special_care:
            return [{"type": care.care_type.get_name_display(), "description": care.description } for care in SpecialCareUserModel.objects.filter(care_receiver=instance)]
        else:
            return []

class CareRequestSerializer(serializers.ModelSerializer):
    caregiver = serializers.SerializerMethodField()
    carereceiver = serializers.SerializerMethodField()
    class Meta:
        model = CareRequestModel
        fields = "__all__"
    
    def get_caregiver(self, instance):
        caregiver_serializer = UserCaregiverRequestsSerializer(instance.caregiver, context={"status": instance.status})
        return caregiver_serializer.data
    
    def get_carereceiver(self, instance):
        caregiver_serializer = UserCareReceiverRequestsSerializer(instance.carereceiver, context={"status": instance.status})
        return caregiver_serializer.data

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = RatingModel
        fields = "__all__"

class RatingListSerializer(serializers.ModelSerializer):
    care_receiver = serializers.SerializerMethodField()
    caregiver = serializers.SerializerMethodField()
    
    def get_care_receiver(self, instance):
        carereceiver = instance.care_request.carereceiver.user
        if carereceiver:
            return {"name": carereceiver.name, "picture": carereceiver.picture}
        else:
            return {}
        
    def get_caregiver(self, instance):
        caregiver = instance.care_request.caregiver.user
        if caregiver:
            return {"name": caregiver.name, "picture": caregiver.picture}
        else:
            return {}

    class Meta:
        model = RatingModel
        fields = ["id", "rating", "description", "care_receiver", "caregiver"]

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