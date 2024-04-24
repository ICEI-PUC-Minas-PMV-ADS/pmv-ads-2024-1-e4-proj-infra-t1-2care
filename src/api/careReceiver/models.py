from django.db import models
from user.models import CustomUserModel
import uuid

class CareReceiverModel(models.Model):
    user = models.OneToOneField(
        CustomUserModel, on_delete=models.CASCADE, related_name="care_receiver"
    )
    emergency_contact = models.CharField("Telefone de Emergência", max_length=15)
    share_special_care = models.BooleanField(
        "Compartilhar Cuidados Especiais", default=False
    )
    additional_info = models.TextField("Informações Adicionais", blank=True, null=True)

    def __str__(self):
        return f"{self.user.name} - Care Receiver"

    class Meta:
        verbose_name = "Care Receiver"
        verbose_name_plural = "Care Receivers"

class SpecialCareModel(models.Model):
    CARE_TYPES = [
        (
            0,
            "Cuidados com a Saúde",
        ),  # Assistência com medicação, monitoramento de condições de saúde, etc.
        (
            1,
            "Apoio Emocional",
        ),  # Companhia, atividades que estimulam a interação social.
        (
            2,
            "Fisioterapia",
        ),  # Exercícios de reabilitação, massagens, prevenção de quedas.
        (
            3,
            "Acompanhamento Médico",
        ),  # Visitas ao médico, exames, acompanhamento em procedimentos.
        (
            4,
            "Apoio à Mobilidade",
        ),  # Assistência para andar, usar cadeira de rodas, transferências.
        (5, "Cuidados Pessoais"),  # Higiene pessoal, banho, vestimenta.
        (6, "Apoio Doméstico"),  # Limpeza, manutenção da casa, lavanderia.
        (
            7,
            "Nutrição",
        ),  # Preparo de refeições, acompanhamento nutricional, ajuda com alimentação.
        (8, "Atividades Recreativas"),  # Jogos, artesanato, leitura, exercícios leves.
        (
            9,
            "Gestão de Demência/Alzheimer",
        ),  # Estratégias específicas para manejo, suporte cognitivo.
        (
            10,
            "Suporte Noturno",
        ),  # Assistência durante a noite, prevenção de confusão noturna.
        (
            11,
            "Gestão da Dor",
        ),  # Técnicas de alívio da dor, acompanhamento de medicação para dor.
        (
            12,
            "Cuidados Paliativos",
        ),  # Conforto no final da vida, suporte emocional e espiritual.
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.IntegerField(choices=CARE_TYPES)

    def __str__(self):
        return self.get_name_display()


class SpecialCareUserModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    care_type = models.ForeignKey(
        "SpecialCareModel", on_delete=models.CASCADE, related_name="special_care_users"
    )
    care_receiver = models.ForeignKey(
        "CareReceiverModel", on_delete=models.CASCADE, related_name="special_care_users"
    )
    description = models.TextField()

    def __str__(self):
        return f"{self.care_receiver.user.name} - {self.care_type.name}: {self.description[:20]}..."
