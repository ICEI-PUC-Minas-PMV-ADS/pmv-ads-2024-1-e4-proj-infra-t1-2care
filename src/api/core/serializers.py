from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CareReceiver, Qualification, WorkExperience, Specialization, FixedUnavailableDay, FixedUnavailableHour, CustomUnavailableDay, Caregiver, CareRequest, Rating, CustomUser



class QualificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Qualification
        fields = '__all__'

class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkExperience
        fields = '__all__'

class SpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialization
        fields = '__all__'

class FixedUnavailableDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = FixedUnavailableDay
        fields = '__all__'

class FixedUnavailableHourSerializer(serializers.ModelSerializer):
    class Meta:
        model = FixedUnavailableHour
        fields = '__all__'

class CustomUnavailableDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUnavailableDay
        fields = '__all__'

class CaregiverSerializer(serializers.ModelSerializer):
    qualifications = QualificationSerializer(many=True, required=False)
    work_exp = WorkExperienceSerializer(many=True, required=False)
    specializations = SpecializationSerializer(many=True, required=False)
    fixed_unavailable_days = FixedUnavailableDaySerializer(many=True, required=False)
    fixed_unavailable_hours = FixedUnavailableHourSerializer(many=True, required=False)
    custom_unavailable_days = CustomUnavailableDaySerializer(many=True, required=False)

    class Meta:
        model = Caregiver
        fields = '__all__'

class CareReceiverSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareReceiver
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}  # Isso garante que a senha não seja retornada nas respostas

    def create(self, validated_data):
        print(validated_data)
        # Extrai a senha do validated_data e a remove do dicionário
        password = validated_data.pop('password')
        
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
        fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'
