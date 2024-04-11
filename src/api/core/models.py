from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid
from django.contrib.auth.models import User


class CustomUserModel(AbstractUser):
    GENDER_CHOICES = [
        (0, "Não especificado"),
        (1, "Masculino"),
        (2, "Feminino"),
    ]
    PREFERRED_CONTACT_CHOICES = [
        (0, "Email"),
        (1, "Phone"),
        (2, "None"),
    ]

    USER_TYPE_CHOICES = [
        (1, "Caregiver"),
        (2, "CareReceiver"),
    ]

    user_type = models.CharField(
        max_length=12, choices=USER_TYPE_CHOICES, blank=False, null=False
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, blank=False, null=False)
    password = models.CharField(max_length=128)
    name = models.CharField(unique=True, max_length=80, null=False, blank=False)
    phone = models.CharField(max_length=64)
    picture = models.TextField(blank=True, null=True)
    address = models.TextField()
    post_code = models.CharField(max_length=15)
    latitude = models.DecimalField(max_digits=10, decimal_places=6)
    longitude = models.DecimalField(max_digits=10, decimal_places=6)
    user_type = models.IntegerField()
    gender = models.IntegerField(choices=GENDER_CHOICES)
    preferred_contact = models.IntegerField(choices=PREFERRED_CONTACT_CHOICES)
    birth_date = models.DateField(null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

class QualificationModel(models.Model):
    id = models.UUIDField("id", primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField("Nome", max_length=255)
    conclusion_date = models.DateField("Data de conclusão")
    file = models.TextField("Link do comprovante de conclusão", null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.conclusion_date.strftime('%d/%m/%Y')}"

    class Meta:
        ordering = ["conclusion_date"]
        verbose_name_plural = "Qualifications"


class WorkExperienceModel(models.Model):
    id = models.UUIDField("id", primary_key=True, default=uuid.uuid4, editable=False)
    place = models.CharField("Local", max_length=128)
    description = models.TextField("Descrição")
    start_date = models.DateField("Data de inicio")
    end_date = models.DateField("Data de saida")

    def __str__(self):
        return f"{self.place} | {self.start_date.strftime('%d/%m/%Y')} - {self.end_date.strftime('%d/%m/%Y')}"

    class Meta:
        ordering = ["end_date"]
        verbose_name_plural = "Work Experiences"


class SpecializationModel(models.Model):
    SPECIALIZATION = (
        (0, "Cuidados Básicos de Saúde"),
        (1, "Apoio à Mobilidade"),
        (2, "Higiene e Cuidados Pessoais"),
        (3, "Nutrição e Preparo de Refeições"),
        (4, "Estimulação Cognitiva e Emocional"),
        (5, "Acompanhamento e Transporte"),
        (6, "Gestão de Rotinas e Medicamentos"),
        (7, "Cuidados com o Ambiente Doméstico"),
        (8, "Suporte em Cuidados Paliativos"),
        (9, "Formação em Demência e Alzheimer"),
    )

    id = models.UUIDField("id", primary_key=True, default=uuid.uuid4, editable=False)
    name = models.SmallIntegerField("Especialização", choices=SPECIALIZATION)

    def __str__(self):
        return self.get_name_display()


class FixedUnavailableDayModel(models.Model):
    DAYS = (
        (0, "Domingo"),
        (1, "Segunda-feira"),
        (2, "Terça-feira"),
        (3, "Quarta-feira"),
        (4, "Quinta-feira"),
        (5, "Sexta-feira"),
        (6, "Sábado"),
    )

    id = models.UUIDField("id", primary_key=True, default=uuid.uuid4, editable=False)
    day = models.SmallIntegerField("Dia da semana indisponivel", choices=DAYS)

    def __str__(self):
        return self.get_day_display()

    class Meta:
        ordering = ["day"]
        verbose_name_plural = "Unavailable week days"


class FixedUnavailableHourModel(models.Model):
    HOURS = (
        (0, "Meia-noite"),
        (1, "1 hora"),
        (2, "2 horas"),
        (3, "3 horas"),
        (4, "4 horas"),
        (5, "5 horas"),
        (6, "6 horas"),
        (7, "7 horas"),
        (8, "8 horas"),
        (9, "9 horas"),
        (10, "10 horas"),
        (11, "11 horas"),
        (13, "13 horas"),
        (14, "14 horas"),
        (15, "15 horas"),
        (16, "16 horas"),
        (17, "17 horas"),
        (18, "18 horas"),
        (19, "19 horas"),
        (20, "20 horas"),
        (21, "21 horas"),
        (22, "22 horas"),
        (23, "23 horas"),
    )

    id = models.UUIDField("id", primary_key=True, default=uuid.uuid4, editable=False)
    hour = models.SmallIntegerField("Horario indisponivel", choices=HOURS)

    def __str__(self):
        return self.get_hour_display()

    class Meta:
        ordering = ["hour"]
        verbose_name_plural = "Unavailable hours"


class CustomUnavailableDayModel(models.Model):
    id = models.UUIDField("id", primary_key=True, default=uuid.uuid4, editable=False)
    day = models.DateField("Dia indisponivel")

    def __str__(self):
        return self.day.strftime("%d/%m/%Y")

    class Meta:
        ordering = ["day"]
        verbose_name_plural = "Unavailable days"


class CaregiverModel(models.Model):
    id = models.UUIDField("id", primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey("core.CustomUserModel", on_delete=models.PROTECT)

    qualifications = models.ManyToManyField(
        "core.QualificationModel",
        verbose_name="Qualificações",
        related_name="qualifications",
        blank=True,
    )
    work_exp = models.ManyToManyField(
        "core.WorkExperienceModel",
        verbose_name="Experiencia de trabalho",
        related_name="workexperience",
        blank=True,
    )
    specializations = models.ManyToManyField(
        "core.SpecializationModel",
        verbose_name="Especializações",
        related_name="specialization",
        blank=True,
    )
    fixed_unavailable_days = models.ManyToManyField(
        "core.FixedUnavailableDayModel",
        verbose_name="Dias da semana indisponivel",
        related_name="fixedunavailableday",
        blank=True,
    )
    fixed_unavailable_hours = models.ManyToManyField(
        "core.FixedUnavailableHourModel",
        verbose_name="Horarios indisponiveis",
        related_name="fixedunavailablehour",
        blank=True,
    )
    custom_unavailable_days = models.ManyToManyField(
        "core.CustomUnavailableDayModel",
        verbose_name="Dias indisponiveis",
        related_name="customunavailableday",
        blank=True,
    )

    hour_price = models.DecimalField("Valor da hora", max_digits=6, decimal_places=2)
    day_price = models.DecimalField(
        "Valor da diaria", max_digits=6, decimal_places=2, null=True, blank=True
    )
    max_request_km = models.PositiveSmallIntegerField(
        "Distancia maxima de trabalho", null=True, blank=True
    )
    career_time = models.PositiveSmallIntegerField("Anos de experiencia", default=0)
    additional_info = models.TextField("Informações adicionais", null=True, blank=True)

    def __str__(self):
        return f"Caregiver - {self.id}"

    class Meta:
        # ordering = ['user']
        verbose_name_plural = "Caregivers"


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
        return f"{self.user.username} - Care Receiver"

    class Meta:
        verbose_name = "Care Receiver"
        verbose_name_plural = "Care Receivers"


class CareRequestModel(models.Model):
    STATUS_CHOICES = [
        (0, "Pendente"),
        (1, "Recusado"),
        (2, "Autorizado"),
    ]
    id = models.UUIDField(primary_key=True, editable=False)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    total_hours = models.SmallIntegerField()
    final_price = models.DecimalField(max_digits=6, decimal_places=2)
    status = models.IntegerField(choices=STATUS_CHOICES)
    response_date = models.DateTimeField()

    caregiver = models.ForeignKey("CaregiverModel", on_delete=models.CASCADE)
    carereceiver = models.ForeignKey("CareReceiverModel", on_delete=models.CASCADE)


class RatingModel(models.Model):
    RATING_CHOICES = [
        (1, "1 Estrela"),
        (2, "2 Estrelas"),
        (3, "3 Estrelas"),
        (4, "4 Estrelas"),
        (5, "5 Estrelas"),
    ]
    id = models.UUIDField(primary_key=True, editable=False)
    care_request = models.OneToOneField(CareRequestModel, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=RATING_CHOICES)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.rating} - {self.description}"


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
        SpecialCareModel, on_delete=models.CASCADE, related_name="special_care_users"
    )
    care_receiver = models.ForeignKey(
        "CareReceiverModel", on_delete=models.CASCADE, related_name="special_care_users"
    )
    description = models.TextField()

    def __str__(self):
        return f"{self.care_receiver.user.username} - {self.care_type.name}: {self.description[:20]}..."
