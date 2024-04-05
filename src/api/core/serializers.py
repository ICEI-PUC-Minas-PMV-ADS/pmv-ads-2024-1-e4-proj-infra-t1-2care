import re
from django.forms import ValidationError
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import (
    CareReceiver,
    Qualification,
    WorkExperience,
    Specialization,
    FixedUnavailableDay,
    FixedUnavailableHour,
    CustomUnavailableDay,
    Caregiver,
    CareRequest,
    Rating,
    CustomUser,
)


class QualificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Qualification
        fields = "__all__"

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
        model = WorkExperience
        fields = "__all__"


class SpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialization
        fields = "__all__"

        def validate_name(self, value):
            if value not in [choice[0] for choice in Specialization.SPECIALIZATION]:
                raise serializers.ValidationError(
                    "Este não é um valor válido para o campo 'name'."
                )

            return value


class FixedUnavailableDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = FixedUnavailableDay
        fields = "__all__"


class FixedUnavailableHourSerializer(serializers.ModelSerializer):
    class Meta:
        model = FixedUnavailableHour
        fields = "__all__"


class CustomUnavailableDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUnavailableDay
        fields = "__all__"


class CaregiverSerializer(serializers.ModelSerializer):
    qualifications = QualificationSerializer(many=True, required=False)
    work_exp = WorkExperienceSerializer(many=True, required=False)
    specializations = SpecializationSerializer(many=True, required=False)
    fixed_unavailable_days = FixedUnavailableDaySerializer(many=True, required=False)
    fixed_unavailable_hours = FixedUnavailableHourSerializer(many=True, required=False)
    custom_unavailable_days = CustomUnavailableDaySerializer(many=True, required=False)

    class Meta:
        model = Caregiver
        fields = "__all__"


class CareReceiverSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareReceiver
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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"
        extra_kwargs = {
            "password": {"write_only": True}
        }  # Isso garante que a senha não seja retornada nas respostas

    def create(self, validated_data):
        print(validated_data)
        # Extrai a senha do validated_data e a remove do dicionário
        password = validated_data.pop("password")

        # Cria o usuário com os dados validados, exceto a senha
        user = CustomUser.objects.create(**validated_data)

        # Define a senha para o usuário (isso irá criptografar a senha adequadamente)
        user.set_password(password)

        # Salva o usuário após definir a senha
        user.save()

        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    # Opcionalmente, personalize o TokenObtainPairSerializer
    pass


class CareRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareRequest
        fields = "__all__"


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = "__all__"

        fields = "__all__"




