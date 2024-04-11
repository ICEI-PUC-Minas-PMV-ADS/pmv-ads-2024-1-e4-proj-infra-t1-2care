import re
from django.forms import ValidationError
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import (
    CareReceiverModel,
    QualificationModel,
    SpecialCareModel,
    SpecialCareUserModel,
    WorkExperienceModel,
    SpecializationModel,
    FixedUnavailableDayModel,
    FixedUnavailableHourModel,
    CustomUnavailableDayModel,
    CaregiverModel,
    CareRequestModel,
    RatingModel,
    CustomUserModel,
)

from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUserModel
        # Inclua todos os campos que você deseja expor via API
        fields = (
            "id",
            "username",
            "email",
            "name",
            "date_joined",
            "picture",
            "latitude",
            "longitude",
            "user_type",
            "password",
            "gender",
            "preferred_contact",
            "phone",
            "address",
            "post_code",
            "birth_date",
        )
        
        extra_kwargs = {
            "password": {"write_only": True},
            # Garantir que campos sensíveis não sejam manipuláveis
            "is_staff": {"read_only": True},
            "is_superuser": {"read_only": True},
            "user_permissions": {"read_only": True},
            "groups": {"read_only": True},
            "date_joined": {"read_only": True},
        }
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super(UserSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        instance.password = make_password(validated_data.get('password', instance.password))
        return super(UserSerializer, self).update(instance, validated_data)

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
        if not re.match(url_regex, value):
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


class CareReceiverSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareReceiverModel
        fields = "__all__"

    def validate_emergency_contact(self, value):
        """
        Verifique se o telefone de emergência está no formato desejado.
        """
        import re

        if not re.match(r"^\+?1?\d{9,15}$", value):
            raise serializers.ValidationError(
                "O telefone deve estar no formato: '+999999999'. Até 15 dígitos são permitidos."
            )
        return value

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    # Opcionalmente, personalize o TokenObtainPairSerializer
    pass


class CareRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareRequestModel
        fields = "__all__"


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = RatingModel
        fields = "__all__"


class SpecialCareSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialCareModel
        fields = "__all__"


class SpecialCareUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialCareUserModel
