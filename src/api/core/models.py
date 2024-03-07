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
