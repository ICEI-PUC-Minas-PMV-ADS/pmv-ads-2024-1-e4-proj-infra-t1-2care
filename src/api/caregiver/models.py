from django.db import models
import uuid

class CaregiverModel(models.Model):
    id = models.UUIDField("id", primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey("user.CustomUserModel", on_delete=models.PROTECT)

    qualifications = models.ManyToManyField(
        "caregiver.QualificationModel",
        verbose_name="Qualificações",
        related_name="qualifications",
        blank=True,
    )
    work_exp = models.ManyToManyField(
        "caregiver.WorkExperienceModel",
        verbose_name="Experiencia de trabalho",
        related_name="workexperience",
        blank=True,
    )
    specializations = models.ManyToManyField(
        "caregiver.SpecializationModel",
        verbose_name="Especializações",
        related_name="specialization",
        blank=True,
    )
    fixed_unavailable_days = models.ManyToManyField(
        "caregiver.FixedUnavailableDayModel",
        verbose_name="Dias da semana indisponivel",
        related_name="fixedunavailableday",
        blank=True,
    )
    fixed_unavailable_hours = models.ManyToManyField(
        "caregiver.FixedUnavailableHourModel",
        verbose_name="Horarios indisponiveis",
        related_name="fixedunavailablehour",
        blank=True,
    )
    custom_unavailable_days = models.ManyToManyField(
        "caregiver.CustomUnavailableDayModel",
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
        return f"Caregiver - {self.user}"

    class Meta:
        # ordering = ['user']
        verbose_name_plural = "Caregivers"



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
        (12, "12 horas"),
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
        (23, "23 horas")
    )

    id = models.UUIDField("id", primary_key=True, default=uuid.uuid4, editable=False)
    hour = models.SmallIntegerField("Horario indisponivel", choices=HOURS)

    def __str__(self):
        return f"{self.get_hour_display()}"

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



class RatingModel(models.Model):
    RATING_CHOICES = [
        (1, "1 Estrela"),
        (2, "2 Estrelas"),
        (3, "3 Estrelas"),
        (4, "4 Estrelas"),
        (5, "5 Estrelas"),
    ]
    id = models.UUIDField("id", primary_key=True, default=uuid.uuid4, editable=False)
    care_request = models.OneToOneField("caregiver.CareRequestModel", on_delete=models.CASCADE)
    rating = models.IntegerField(choices=RATING_CHOICES)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.rating} - {self.description}"
    

class CareRequestModel(models.Model):
    STATUS_CHOICES = [
        (0, "Pendente"),
        (1, "Recusado"),
        (2, "Autorizado"),
    ]
    id = models.UUIDField("id", primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    total_hours = models.SmallIntegerField()
    final_price = models.DecimalField(max_digits=6, decimal_places=2)
    status = models.IntegerField(choices=STATUS_CHOICES)
    response_date = models.DateTimeField()

    caregiver = models.ForeignKey("caregiver.CaregiverModel", on_delete=models.CASCADE)
    carereceiver = models.ForeignKey("careReceiver.CareReceiverModel", on_delete=models.CASCADE)