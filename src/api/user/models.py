from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
import uuid

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.name = email
        user.latitude = 0
        user.longitude = 0
        user.user_type = 1
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)


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

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, blank=False, null=False)
    password = models.CharField(max_length=128)
    name = models.CharField(max_length=80, null=False, blank=False)
    phone = models.CharField(max_length=64)
    picture = models.TextField(blank=True, null=True)
    address = models.TextField()
    post_code = models.CharField(max_length=15)
    latitude = models.DecimalField(max_digits=10, decimal_places=6)
    longitude = models.DecimalField(max_digits=10, decimal_places=6)
    user_type = models.IntegerField(choices=USER_TYPE_CHOICES)
    gender = models.IntegerField(choices=GENDER_CHOICES, default=0)
    preferred_contact = models.IntegerField(choices=PREFERRED_CONTACT_CHOICES, default=0)
    birth_date = models.DateField(null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name