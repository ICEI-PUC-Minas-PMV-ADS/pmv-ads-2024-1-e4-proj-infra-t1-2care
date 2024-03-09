from django.db import models
import uuid

class Greeting(models.Model):
    message = models.CharField(max_length=200)

    def __str__(self):
        return self.message

# class User(models.Model):
#     GENDER_CHOICES = [
#         (0, 'Not Specified'),
#         (1, 'Male'),
#         (2, 'Female'),
#         (3, 'Other'),
#     ]
#     PREFERRED_CONTACT_CHOICES = [
#         (0, 'Email'),
#         (1, 'Phone'),
#         (2, 'None'),
#     ]

#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=128)
#     name = models.CharField(max_length=50)
#     phone = models.CharField(max_length=64)
#     picture = models.TextField(blank=True, null=True)
#     address = models.TextField()
#     post_code = models.CharField(max_length=15)
#     latitude = models.DecimalField(max_digits=10, decimal_places=6)
#     longitude = models.DecimalField(max_digits=10, decimal_places=6)
#     user_type = models.IntegerField()
#     gender = models.IntegerField(choices=GENDER_CHOICES)
#     preferred_contact = models.IntegerField(choices=PREFERRED_CONTACT_CHOICES)
#     birth_date = models.DateField(null=True, blank=True)
#     created_date = models.DateTimeField(auto_now_add=True)
#     updated_date = models.DateTimeField(auto_now=True)

# class SpecialCare(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     name = models.CharField(max_length=255)

# class SpecialCareUser(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     care_type = models.ForeignKey(SpecialCare, on_delete=models.CASCADE)
#     description = models.TextField()

# class CareReceiver(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     emergency_contact = models.CharField(max_length=64)
#     share_special_care = models.BooleanField(default=True)
#     additional_info = models.TextField(blank=True, null=True)

# class Qualification(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     name = models.CharField(max_length=255)
#     file = models.FileField(upload_to='qualifications/', blank=True, null=True)

# class WorkExperience(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     place = models.CharField(max_length=128)
#     description = models.TextField(blank=True, null=True)
#     start_date = models.DateField()
#     end_date = models.DateField()

# class Specialization(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     name = models.CharField(max_length=255)  # Ajuste o tipo de campo conforme necessário

class Qualification(models.Model):
    id = models.UUIDField('id', primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField('Nome', max_length=255)
    conclusion_date = models.DateField('Data de conclusão')
    file = models.TextField('Link do comprovante de conclusão', null=True, blank=True)

    def __str__(self):
        return f"{self.user} - {self.conclusion_date.strftime('%d/%m/%Y')}"
    
    class Meta:
        ordering = ['conclusion_date']
        verbose_name_plural = "Qualifications"

class WorkExperience(models.Model):
    id = models.UUIDField('id', primary_key=True, default=uuid.uuid4, editable=False)
    place = models.CharField('Local', max_length=128)
    description = models.TextField("Descrição")
    start_date = models.DateField('Data de inicio')
    end_date = models.DateField('Data de saida')

    def __str__(self):
        return f"{self.place} | {self.start_date.strftime('%d/%m/%Y')} - {self.end_date.strftime('%d/%m/%Y')}"
    
    class Meta:
        ordering = ['end_date']
        verbose_name_plural = "Work Experiences"
class Specialization(models.Model):
    SPECIALIZATION = ( # na verdade foi uma pessima ideia fazer assim, no minimo seria bom um model separado pras choices, que fica mais facil de pessoas sem conhecimento editarem num admin da vida. 
        (0, 'Fisioterapia Gerontológica'), # mas como já é a gente que vai ter que editar msm, acho que tanto faz.
        (1, 'Cuidados Geriátricos'), # não tenho a minima ideia de exemplos btw.
    )
    
    id = models.UUIDField('id', primary_key=True, default=uuid.uuid4, editable=False)
    name = models.SmallIntegerField('Especialização', choices=SPECIALIZATION)

    def __str__(self):
        return self.get_name_display()

class FixedUnavailableDay(models.Model):
    DAYS = (
        (0, "Domingo"),
        (1, "Segunda-feira"),
        (2, "Terça-feira"),
        (3, "Quarta-feira"),
        (4, "Quinta-feira"),
        (5, "Sexta-feira"),
        (6, "Sábado"),
    )

    id = models.UUIDField('id', primary_key=True, default=uuid.uuid4, editable=False)
    day = models.SmallIntegerField('Dia da semana indisponivel', choices=DAYS)
    
    def __str__(self):
        return self.get_day_display()

    class Meta:
        ordering = ['day']
        verbose_name_plural = "Unavailable week days"

class FixedUnavailableHour(models.Model):
    HOURS = (
        (0, "Meia-noite"),(1, "1 hora"),(2, "2 horas"),
        (3, "3 horas"), (4, "4 horas"), (5, "5 horas"),
        (6, "6 horas"), (7, "7 horas"), (8, "8 horas"),
        (9, "9 horas"), (10, "10 horas"), (11, "11 horas"),
        (13, "13 horas"), (14, "14 horas"), (15, "15 horas"),
        (16, "16 horas"), (17, "17 horas"), (18, "18 horas"),
        (19, "19 horas"), (20, "20 horas"), (21, "21 horas"),
        (22, "22 horas"), (23, "23 horas")
    )

    id = models.UUIDField('id', primary_key=True, default=uuid.uuid4, editable=False)
    hour = models.SmallIntegerField('Horario indisponivel', choices=HOURS)

    def __str__(self):
        return self.get_hour_display()
    class Meta:
        ordering = ['hour']
        verbose_name_plural = "Unavailable hours"

class CustomUnavailableDay(models.Model):
    id = models.UUIDField('id', primary_key=True, default=uuid.uuid4, editable=False)
    day = models.DateField("Dia indisponivel")

    def __str__(self):
        return self.day.strftime('%d/%m/%Y')
    
    class Meta:
        ordering = ['day']
        verbose_name_plural = "Unavailable days"


class Caregiver(models.Model):
    id = models.UUIDField('id', primary_key=True, default=uuid.uuid4, editable=False)
    #user = models.ForeignKey('', on_delete=models.PROTECT)

    qualifications = models.ManyToManyField('core.qualification', verbose_name='Qualificações', related_name='qualifications', blank=True)
    work_exp = models.ManyToManyField('core.workexperience', verbose_name='Experiencia de trabalho', related_name='workexperience', blank=True)
    specializations = models.ManyToManyField('core.specialization', verbose_name='Especializações', related_name='specialization', blank=True)
    fixed_unavailable_days = models.ManyToManyField('core.fixedunavailableday', verbose_name='Dias da semana indisponivel', related_name='fixedunavailableday', blank=True)
    fixed_unavailable_hours = models.ManyToManyField('core.fixedunavailablehour', verbose_name='Horarios indisponiveis', related_name='fixedunavailablehour', blank=True)
    custom_unavailable_days = models.ManyToManyField('core.customunavailableday', verbose_name='Dias indisponiveis', related_name='customunavailableday', blank=True)

    hour_price = models.DecimalField('Valor da hora', max_digits=6, decimal_places=2)
    day_price = models.DecimalField('Valor da diaria', max_digits=6, decimal_places=2, null=True, blank=True)
    max_request_km = models.PositiveSmallIntegerField('Distancia maxima de trabalho', null=True, blank=True)
    career_time = models.PositiveSmallIntegerField('Anos de experiencia', default=0)
    additional_info =models.TextField('Informações adicionais', null=True, blank=True)

    def __str__(self):
        return f"Caregiver - {self.user}"
    
    class Meta:
        #ordering = ['user']
        verbose_name_plural = "Caregivers"
