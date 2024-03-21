import re
from django.forms import ValidationError
from rest_framework import serializers
from .models import (
    Greeting,
    Qualification,
    WorkExperience,
    Specialization,
    FixedUnavailableDay,
    FixedUnavailableHour,
    CustomUnavailableDay,
    Caregiver,
    Carereceiver,
    User,
)

class GreetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Greeting
        fields = '__all__'

class QualificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Qualification
        fields = '__all__'
    
    def validate_file(self, value):
        if not isinstance(value, str):
            raise ValidationError("O campo 'file' deve ser uma string.")

        url_regex = re.compile(
            r'^(?:http|ftp)s?://' 
            r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'
            r'(?::\d+)?'
            r'(?:/?|[/?]\S+)$', re.IGNORECASE)
        if not re.match(url_regex, value):
            raise ValidationError("O campo 'file' deve conter um link válido.")

        return value






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

class CarereceiverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carereceiver
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    
    def create(self, data):
        user = User.objects.create_user(data)
        return user
