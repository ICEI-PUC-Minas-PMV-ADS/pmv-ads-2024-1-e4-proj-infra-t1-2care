from rest_framework import serializers
from .models import (
    CareReceiverModel,
    SpecialCareModel,
    SpecialCareUserModel,
)


class CareReceiverSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareReceiverModel
        fields = "__all__"

    """def validate_emergency_contact(self, value):
        
        #Verifique se o telefone de emergência está no formato desejado.
        
        import re

        if not re.match(r"^\+?1?\d{9,15}$", value):
            raise serializers.ValidationError(
                "O telefone deve estar no formato: '+999999999'. Até 15 dígitos são permitidos."
            )
        return value"""

class SpecialCareSerializer(serializers.ModelSerializer):
    name_display = serializers.CharField(source='get_name_display', read_only=True)

    class Meta:
        model = SpecialCareModel
        fields = "__all__"


class SpecialCareUserSerializer(serializers.ModelSerializer):
    care_type_display = SpecialCareSerializer(source='care_type', read_only=True)
    class Meta:
        model = SpecialCareUserModel
        fields = "__all__"
