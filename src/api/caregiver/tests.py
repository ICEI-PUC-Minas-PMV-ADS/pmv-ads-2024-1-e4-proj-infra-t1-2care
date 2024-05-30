from django.forms import ValidationError
from django.db import IntegrityError
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .models import (
    QualificationModel,
    WorkExperienceModel,
    SpecializationModel,
    FixedUnavailableDayModel,
    FixedUnavailableHourModel,
    CustomUnavailableDayModel,
    CaregiverModel,
)
from user.models import CustomUserModel
from .serializers import (
    QualificationSerializer,
    WorkExperienceSerializer,
    SpecializationSerializer,
    FixedUnavailableDaySerializer,
    FixedUnavailableHourSerializer,
    CustomUnavailableDaySerializer,
    CaregiverSerializer,
)

from datetime import datetime, date
from decimal import Decimal

class CaregiverSerializerTests(TestCase):
    def setUp(self):
        self.user_data = {
            "email": "carlos@gmail.com",
            "name": "Carlos Ferreira",
            "picture": "string",
            "latitude": "10.000000",
            "longitude": "10.000000",
            "user_type": 1,
            "gender": 0,
            "preferred_contact": 0,
            "password": "123",
            "phone": "+5521999999999",
            "address": "a really cool place",
            "post_code": "66666666"
        }

        self.user = CustomUserModel.objects.create(**self.user_data)

        self.qualification_data = {
            "name": "Degree in Nursing",
            "conclusion_date": timezone.now().date(),
            "file": "http://example.com/file.pdf",
        }
        self.qualification = QualificationModel.objects.create(**self.qualification_data)

        self.work_experience_data = {
            "place": "Hospital ABC",
            "description": "Provided care to elderly patients",
            "start_date": timezone.now().date(),
            "end_date": timezone.now().date() + timezone.timedelta(days=365),
        }
        self.work_experience = WorkExperienceModel.objects.create(
            **self.work_experience_data
        )

        self.specialization_data = {"name": 0}
        self.specialization = SpecializationModel.objects.create(**self.specialization_data)

        self.fixed_unavailable_day_data = {"day": 0}
        self.fixed_unavailable_day = FixedUnavailableDayModel.objects.create(
            **self.fixed_unavailable_day_data
        )

        self.fixed_unavailable_hour_data = {"hour": 0}
        self.fixed_unavailable_hour = FixedUnavailableHourModel.objects.create(
            **self.fixed_unavailable_hour_data
        )

        self.custom_unavailable_day_data = {"day": "2024-03-10"}
        self.custom_unavailable_day = CustomUnavailableDayModel.objects.create(
            **self.custom_unavailable_day_data
        )

        self.caregiver_data = {
            "user": self.user,
            "hour_price": "25.00",
            "day_price": "180.00",
            "max_request_km": 60,
            "career_time": 7,
            "additional_info": "Experienced with dementia care.",
        }

        self.caregiver = CaregiverModel.objects.create(**self.caregiver_data)

        self.caregiver.qualifications.set([self.qualification])
        self.caregiver.work_exp.set([self.work_experience])
        self.caregiver.specializations.set([self.specialization])
        self.caregiver.fixed_unavailable_days.set([self.fixed_unavailable_day])
        self.caregiver.custom_unavailable_days.set([self.custom_unavailable_day])

    def test_work_experience_serializer(self):
        serializer = WorkExperienceSerializer(instance=self.work_experience)
        self.assertEqual(serializer.data["place"], self.work_experience_data["place"])

    def test_create_work_experience_serializer(self):
        new_work_experience_data = {
            "place": "Hospital",
            "description": "Provided care",
            "start_date": timezone.now().date(),
            "end_date": timezone.now().date() + timezone.timedelta(days=365),
        }
        serializer = WorkExperienceSerializer(data=new_work_experience_data)
        self.assertTrue(serializer.is_valid())
        work_exp = serializer.save()
        self.assertEqual(work_exp.place, new_work_experience_data["place"])
    
    def test_fail_create_work_experience_serializer(self):
        wrong_work_experience_data = {
            "place": None,
            "start_date": "invalid",
            "end_date": "invalid",
        }
        new_work_experience_data = {
            "place": "Hospital",
            "description": "Provided care",
            "start_date": timezone.now().date(),
            "end_date": timezone.now().date() + timezone.timedelta(days=365),
        }
        for field, value in wrong_work_experience_data.items():

            altered_work_experience_data = new_work_experience_data.copy()
            altered_work_experience_data[field] = wrong_work_experience_data.get(field)

            serializer = WorkExperienceSerializer(data=altered_work_experience_data)

            self.assertFalse(serializer.is_valid())
            self.assertIn(field, serializer.errors)

    def test_update_work_experience_serializer(self):
        new_work_experience_data = {
            "place": "Hospital",
            "description": "Provided care",
            "start_date": timezone.now().date(),
            "end_date": timezone.now().date() + timezone.timedelta(days=365),
        }
        serializer = WorkExperienceSerializer(instance=self.work_experience, data=new_work_experience_data, partial=True)
        self.assertTrue(serializer.is_valid())
        updated_work_exp = serializer.save()

        self.assertEqual(updated_work_exp.id, self.work_experience.id)
        self.assertEqual(updated_work_exp.place, new_work_experience_data["place"])
        self.assertEqual(updated_work_exp.description, new_work_experience_data["description"])

    def test_fail_create_work_experience_serializer(self):
        wrong_work_experience_data = {
            "place": None,
            "start_date": "invalid",
            "end_date": "invalid",
        }
        new_work_experience_data = {
            "place": "Hospital",
            "description": "Provided care",
            "start_date": timezone.now().date(),
            "end_date": timezone.now().date() + timezone.timedelta(days=365),
        }
        for field, value in wrong_work_experience_data.items():

            altered_work_experience_data = new_work_experience_data.copy()
            altered_work_experience_data[field] = wrong_work_experience_data.get(field)

            serializer = WorkExperienceSerializer(data=altered_work_experience_data)

            self.assertFalse(serializer.is_valid())
            self.assertIn(field, serializer.errors)

    def test_update_work_experience_serializer(self):
        new_work_experience_data = {
            "place": "Hospital",
            "description": "Provided care",
            "start_date": timezone.now().date(),
            "end_date": timezone.now().date() + timezone.timedelta(days=365),
        }
        serializer = WorkExperienceSerializer(
            instance=self.work_experience, data=new_work_experience_data, partial=True
        )
        self.assertTrue(serializer.is_valid())
        updated_work_exp = serializer.save()

        self.assertEqual(updated_work_exp.id, self.work_experience.id)
        self.assertEqual(updated_work_exp.place, new_work_experience_data["place"])
        self.assertEqual(
            updated_work_exp.description, new_work_experience_data["description"]
        )

    def test_qualification_serializer(self):
        serializer = QualificationSerializer(instance=self.qualification)
        self.assertEqual(serializer.data["name"], self.qualification_data["name"])

    def test_create_qualification_serializer(self):
        new_qualification_data = {
            "name": "Certificate in Geriatric Care",
            "conclusion_date": timezone.now().date(),
            "file": "http://example.com/certificate.pdf",
        }
        serializer = QualificationSerializer(data=new_qualification_data)
        self.assertTrue(serializer.is_valid())
        qualification = serializer.save()
        self.assertEqual(qualification.name, new_qualification_data["name"])

    #####unit test - Qualification
    def test_create_qualification_serializer_invalid_data(self):
        invalid_qualification_data = {
            "conclusion_date": timezone.now().date(),
            "file": "http://example.com/invalid_certificate.pdf",
        }
        serializer = QualificationSerializer(data=invalid_qualification_data)
        self.assertFalse(serializer.is_valid())

    def test_create_qualification_serializer_invalid_file_url(self):
        invalid_file_url_data = {
            "name": "Certificate in Advanced First Aid",
            "conclusion_date": timezone.now().date(),
            "file": "invalid_url",
        }
        serializer = QualificationSerializer(data=invalid_file_url_data)
        self.assertFalse(serializer.is_valid())

    def test_update_qualification_serializer(self):
        updated_qualification_data = {
            "name": "Certificate in Geriatric Care (Updated)",
            "conclusion_date": timezone.now().date(),
            "file": "http://example.com/updated_certificate.pdf",
        }
        serializer = QualificationSerializer(
            instance=self.qualification, data=updated_qualification_data
        )
        self.assertTrue(serializer.is_valid())
        updated_qualification = serializer.save()
        self.assertEqual(updated_qualification.name, updated_qualification_data["name"])

    def test_update_qualification_with_invalid_data(self):
        invalid_data = {
            "name": "",
            "conclusion_date": timezone.now().date(),
            "file": "http://example.com/invalid_certificate.pdf",
        }
        serializer = QualificationSerializer(
            instance=self.qualification, data=invalid_data
        )
        self.assertFalse(serializer.is_valid())

    def test_retrieve_all_qualification(self):
        qualifications = QualificationModel.objects.all()
        serializer = QualificationSerializer(instance=qualifications, many=True)
        self.assertEqual(len(serializer.data), qualifications.count())

    def test_retrieve_qualification_by_name(self):
        self.test_create_qualification_serializer()
        qualification_name = "Certificate in Geriatric Care"
        qualification = QualificationModel.objects.get(name=qualification_name)
        serializer = QualificationSerializer(instance=qualification)
        self.assertEqual(serializer.data["name"], qualification_name)

    def test_delete_qualification_by_id(self):
        qualification_id = self.qualification.id
        qualification = QualificationModel.objects.get(pk=qualification_id)
        qualification.delete()
        with self.assertRaises(QualificationModel.DoesNotExist):
            QualificationModel.objects.get(pk=qualification_id)

    def test_specialization_serializer(self):
        serializer = SpecializationSerializer(instance=self.specialization)
        self.assertEqual(serializer.data["name"], self.specialization_data["name"])

    def test_create_specialization_serializer(self):
        new_specialization_data = {"name": 1}
        serializer = SpecializationSerializer(data=new_specialization_data)
        self.assertTrue(serializer.is_valid())
        specialization = serializer.save()
        self.assertEqual(specialization.name, new_specialization_data["name"])

    def test_create_specialization_serializer_invalid_data(self):

        invalid_specialization_data = {"name": 13}

        serializer = SpecializationSerializer(data=invalid_specialization_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("name", serializer.errors)

    def test_update_specialization_serializer(self):
        updated_specialization_data = {"name": 4}
        serializer = SpecializationSerializer(
            instance=self.specialization, data=updated_specialization_data
        )
        self.assertTrue(serializer.is_valid())
        updated_specialization = serializer.save()
        self.assertEqual(
            updated_specialization.name, updated_specialization_data["name"]
        )

    def test_update_specialization_with_invalid_data(self):
        invalid_data = {
            "name": "14",
        }
        serializer = SpecializationSerializer(
            instance=self.specialization, data=invalid_data
        )
        self.assertFalse(serializer.is_valid())

    def test_retrieve_all_specialization(self):
        specialization = SpecializationModel.objects.all()
        serializer = SpecializationSerializer(instance=specialization, many=True)
        self.assertEqual(len(serializer.data), specialization.count())

    def test_retrieve_specialization_by_name(self):
        self.test_create_specialization_serializer()
        specialization_name = 1
        specialization = SpecializationModel.objects.get(name=specialization_name)
        serializer = SpecializationSerializer(instance=specialization)
        self.assertEqual(serializer.data["name"], specialization_name)

    def test_delete_specialization_by_id(self):
        specialization_id = self.specialization.id
        specialization = SpecializationModel.objects.get(pk=specialization_id)
        specialization.delete()
        with self.assertRaises(SpecializationModel.DoesNotExist):
            SpecializationModel.objects.get(pk=specialization_id)

    def test_fixed_unavailable_day_serializer(self):
        serializer = FixedUnavailableDaySerializer(instance=self.fixed_unavailable_day)
        self.assertEqual(serializer.data["day"], self.fixed_unavailable_day_data["day"])

    def test_create_fixed_unavailable_day_serializer(self):
        new_fixed_unavailable_day_data = {"day": 1}
        serializer = FixedUnavailableDaySerializer(data=new_fixed_unavailable_day_data)
        self.assertTrue(serializer.is_valid())
        fixed_unavailable_day = serializer.save()
        self.assertEqual(
            fixed_unavailable_day.day, new_fixed_unavailable_day_data["day"]
        )

    def test_fixed_unavailable_hour_serializer(self):
        serializer = FixedUnavailableHourSerializer(
            instance=self.fixed_unavailable_hour
        )
        self.assertEqual(
            serializer.data["hour"], self.fixed_unavailable_hour_data["hour"]
        )

    def test_create_fixed_unavailable_hour_serializer(self):
        new_fixed_unavailable_hour_data = {"hour": 1}
        serializer = FixedUnavailableHourSerializer(
            data=new_fixed_unavailable_hour_data
        )
        self.assertTrue(serializer.is_valid())
        fixed_unavailable_hour = serializer.save()
        self.assertEqual(
            fixed_unavailable_hour.hour, new_fixed_unavailable_hour_data["hour"]
        )

    def test_custom_unavailable_day_serializer(self):
        serializer = CustomUnavailableDaySerializer(
            instance=self.custom_unavailable_day
        )
        self.assertEqual(
            serializer.data["day"], self.custom_unavailable_day_data["day"]
        )

    def test_create_custom_unavailable_day_serializer(self):
        new_custom_unavailable_day_data = {"day": "2024-03-15"}
        serializer = CustomUnavailableDaySerializer(
            data=new_custom_unavailable_day_data
        )
        self.assertTrue(serializer.is_valid())
        custom_unavailable_day = serializer.save()
        self.assertEqual(
            custom_unavailable_day.day,
            datetime.strptime(
                new_custom_unavailable_day_data["day"], "%Y-%m-%d"
            ).date(),
        )

    def test_caregiver_serializer(self):
        serializer = CaregiverSerializer(instance=self.caregiver)
       
        for field, value in self.caregiver_data.items():
            if field == "user":
                self.assertEqual(str(serializer.data["user"]), str(value.id))
            else:
                self.assertEqual(serializer.data[field], value)

    def test_create_caregiver_serializer(self):
        new_caregiver_data = {
            "user": self.user.id,
            "hour_price": Decimal("250.00"),
            "day_price": Decimal("280.00"),
            "max_request_km": 600,
            "career_time": 10,
            "additional_info": "Experienced with dementia",
        }
        serializer = CaregiverSerializer(data=new_caregiver_data)

        self.assertTrue(serializer.is_valid())
        caregiver = serializer.save()
        for field, value in new_caregiver_data.items():
            if field == "user":
                self.assertEqual(str(caregiver.user.id), str(value))
            else:
                self.assertEqual(getattr(caregiver, field), value)

    def test_fail_create_caregiver_serializer(self):
        wrong_caregiver_data = {
            "hour_price": "invalid",
            "day_price": "invalid",
            "max_request_km": "invalid",
            "career_time": "invalid",
        }
        new_caregiver_data = {
            "user": self.user.id,
            "hour_price": Decimal("250.00"),
            "day_price": Decimal("280.00"),
            "max_request_km": 600,
            "career_time": 10,
            "additional_info": "Experienced with dementia",
        }

        for field, value in wrong_caregiver_data.items():

            altered_caregiver_data = new_caregiver_data.copy()
            altered_caregiver_data[field] = wrong_caregiver_data.get(field)

            serializer = CaregiverSerializer(data=altered_caregiver_data)

            self.assertFalse(serializer.is_valid())
            self.assertIn(field, serializer.errors)

            
    def test_update_caregiver_serializer(self):
        new_caregiver_data = {
            "hour_price": Decimal("250.00"),
            "day_price": Decimal("280.00"),
            "max_request_km": 600,
            "career_time": 10,
            "additional_info": "Experienced with dementia",
        }


        serializer = CaregiverSerializer(
            instance=self.caregiver, data=new_caregiver_data, partial=True
        )
        self.assertTrue(serializer.is_valid())
        updated_caregiver = serializer.save()

        self.assertEqual(updated_caregiver.id, self.caregiver.id)
        self.assertEqual(updated_caregiver.hour_price, new_caregiver_data["hour_price"])

        self.assertEqual(
            updated_caregiver.career_time, new_caregiver_data["career_time"]
        )


    def test_add_manytomany_to_caregiver_serializer(self):
        qualification = QualificationModel.objects.create(
            name="Degree in Nursing",
            conclusion_date=timezone.now().date(),
            file="http://example.com/file1.pdf",
        )
        work_exp = WorkExperienceModel.objects.create(
            place="Hospital ABC",
            description="Provided care to elderly patients",
            start_date=timezone.now().date(),
            end_date=timezone.now().date() + timezone.timedelta(days=365),
        )
        specialization = SpecializationModel.objects.create(name=0)
        fixed_unavailable_days = FixedUnavailableDayModel.objects.create(day=0)
        fixed_unavailable_hours = FixedUnavailableHourModel.objects.create(hour=0)
        custom_unavailable_days = CustomUnavailableDayModel.objects.create(
            day=date(2024, 3, 10)
        )

        new_caregiver_data = {
            "user": self.user.id,
            "hour_price": Decimal("25.00"),
            "day_price": Decimal("180.00"),
            "max_request_km": 60,
            "career_time": 7,
            "additional_info": "Experienced with dementia care.",
        }
        serializer = CaregiverSerializer(data=new_caregiver_data)
        self.assertTrue(serializer.is_valid())
        caregiver = serializer.save()

        # esse teste meio que ta errado, se não ta fazendo por um serializer, não faz sentido, parece mais um test de model.
        caregiver.specializations.add(specialization)
        caregiver.work_exp.add(work_exp)
        caregiver.qualifications.add(qualification)
        caregiver.fixed_unavailable_days.add(fixed_unavailable_days)
        caregiver.fixed_unavailable_hours.add(fixed_unavailable_hours)
        caregiver.custom_unavailable_days.add(custom_unavailable_days)

        self.assertEqual(caregiver.specializations.first().name, specialization.name)
        self.assertEqual(caregiver.work_exp.first().place, work_exp.place)
        self.assertEqual(caregiver.qualifications.first().name, qualification.name)
        self.assertEqual(
            caregiver.fixed_unavailable_days.first().day, fixed_unavailable_days.day
        )
        self.assertEqual(
            caregiver.fixed_unavailable_hours.first().hour, fixed_unavailable_hours.hour
        )
        self.assertEqual(
            caregiver.custom_unavailable_days.first().day, custom_unavailable_days.day
        )


class CaregiverAPITests(TestCase):
    def setUp(self):
        
        self.user_data = {
            "email": "carlos@gmail.com",
            "name": "Carlos Ferreira",
            "picture": "string",
            "latitude": "10.000000",
            "longitude": "10.000000",
            "user_type": 1,
            "gender": 0,
            "preferred_contact": 0,
            "password": "123",
            "phone": "+5521999999999",
            "address": "a really cool place",
            "post_code": "66666666"
        }

        self.user = CustomUserModel.objects.create(**self.user_data)

        self.client = APIClient()
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

        self.caregiver_data = {  # esse teste é um pouco estranho pq quando colocarmos auth, ele vai quebrar. ai eu tenho que ver como fazer.
            "user": self.user,
            "hour_price": "25.00",
            "day_price": "180.00",
            "max_request_km": 60,
            "career_time": 7,
            "additional_info": "Experienced with dementia care.",
        }

        self.caregiver = CaregiverModel.objects.create(**self.caregiver_data)

    def test_get_caregiver_list_api(self):
        response = self.client.get(reverse("caregiver-list"))
        self.assertEqual(response.status_code, 200)

    def test_edit_caregiver_api(self):
        new_caregiver_data = {
            "hour_price": "25.00",
            "day_price": "180.00",
            "max_request_km": 60,
            "career_time": 7,
            "additional_info": "Experienced with dementia care.",
        }

        response = self.client.patch(reverse("caregiver-edit"), new_caregiver_data, format="json")

        self.assertEqual(response.status_code, 200)

        caregiver = CaregiverModel.objects.first()
        self.assertEqual(
            caregiver.hour_price, Decimal(new_caregiver_data["hour_price"])
        )
        self.assertEqual(caregiver.day_price, Decimal(new_caregiver_data["day_price"]))
        self.assertEqual(caregiver.max_request_km, new_caregiver_data["max_request_km"])
        self.assertEqual(caregiver.career_time, new_caregiver_data["career_time"])
        self.assertEqual(
            caregiver.additional_info, new_caregiver_data["additional_info"]
        )

    def test_get_caregiver_calendar_as_caregiver_api(self):
        response = self.client.get(reverse("caregiver-self-calendar-view"))
        self.assertEqual(response.status_code, 200)

    def test_get_caregiver_view_as_user_api(self):
        response = self.client.get(
            reverse("caregiver-detail")
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data["additional_info"], self.caregiver_data["additional_info"]
        )
        self.assertEqual(response.data["hour_price"], self.caregiver_data["hour_price"])

    def test_get_caregiver_calendar_as_user_api(
        self,
    ):  # fixme da pra dar um up nesse test quando sair os endpoints de calendar
        response = self.client.get(
            reverse("caregiver-calendar-view", kwargs={"pk": self.caregiver.pk})
        )
        self.assertEqual(response.status_code, 200)

    # test Odair
    def test_create_qualification_API(self):
        url = reverse("qualification-list-create")
        data = {
            "name": "Academic Certificate in well-being care",
            "conclusion_date": "2024-03-15",
            "file": "http://example.com/certificate.pdf",
        }

        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(QualificationModel.objects.count(), 1)
        self.assertEqual(
            QualificationModel.objects.get().name, "Academic Certificate in well-being care"
        )

    def test_update_qualification_API(self):
        qualification = QualificationModel.objects.create(
            name="Previous Qualification",
            conclusion_date="2023-01-01",
            file="http://example.com/previous.pdf",
        )
        url = reverse("qualification-update-delete", args=[qualification.pk])
        data = {
            "name": "Updated Qualification",
            "conclusion_date": "2024-03-16",
            "file": "http://example.com/updated.pdf",
        }
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        qualification.refresh_from_db()
        self.assertEqual(qualification.name, "Updated Qualification")

    def test_failCreate_qualification_API(self):
        url = reverse("qualification-list-create")
        data = {
            "name": "Academic Certificate in well-being care",
            "conclusion_date": "tttt.tt.tt",
            "file": "http://example.com/certificate.pdf",
        }

        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(QualificationModel.objects.count(), 0)

    def test_failUpdate_qualification_API(self):
        qualification = QualificationModel.objects.create(
            name="Previous Qualification",
            conclusion_date="2023-01-01",
            file="http://example.com/previous.pdf",
        )
        url = reverse("qualification-update-delete", args=[qualification.pk])
        data = {
            "name": "",
            "conclusion_date": "2024-03-16",
            "file": "http://example.com/updated.pdf",
        }
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_qualification_API(self):
        qualification = QualificationModel.objects.create(
            name="Previous Qualification",
            conclusion_date="2023-01-01",
            file="http://example.com/previous.pdf",
        )
        self.caregiver.qualifications.add(qualification)
        url = reverse("qualification-update-delete", args=[qualification.pk])

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_qualification_API(self):
        qualification = QualificationModel.objects.create(
            name="Phonoaudiologist",
            conclusion_date="2023-01-01",
            file="http://example.com/previous.pdf",
        )
        url = reverse("qualification-update-delete", args=[qualification.pk])
        data = {
            "name": "Phonoaudiologist",
            "conclusion_date": "2023-01-01",
            "file": "http://example.com/certificate.pdf",
        }

        response = self.client.get(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(QualificationModel.objects.count(), 1)
        self.assertEqual(QualificationModel.objects.get().name, "Phonoaudiologist")

    # leo

    def test_Create_specialization_api(self):
        url = reverse("specialization-list")
        data = {"name": 1}

        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(SpecializationModel.objects.count(), 1)
        self.assertEqual(SpecializationModel.objects.get().name, 1)  #'Apoio à Mobilidade')

    def test_failCreate_specialization_api(self):
        url = reverse("specialization-list")
        data = {
            "name": 10,
        }

        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(SpecializationModel.objects.count(), 0)

    def test_retrieve_specialization_api(self):
        specialization = SpecializationModel.objects.create(
            name=1,
        )
        url = reverse("specialization-retrieve-update-delete", args=[specialization.pk])
        data = {"name": 1}

        response = self.client.get(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(SpecializationModel.objects.count(), 1)
        self.assertEqual(SpecializationModel.objects.get().name, 1)

    def test_delete_specialization_api(self):
        specialization = SpecializationModel.objects.create(
            name=2,
        )
        url = reverse("specialization-retrieve-update-delete", args=[specialization.pk])

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_specialization_api(self):
        specialization = SpecializationModel.objects.create(
            name=3,
        )
        url = reverse("specialization-retrieve-update-delete", args=[specialization.pk])
        data = {"name": 4}
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        specialization.refresh_from_db()
        self.assertEqual(specialization.name, 4)

    def test_failUpdate_specialization_api(self):
        specialization = SpecializationModel.objects.create(
            name=5,
        )
        url = reverse("specialization-retrieve-update-delete", args=[specialization.pk])
        data = {"name": 15}
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_specialization_api(self):
        spe1 = SpecializationModel.objects.create(name=0)  # Cuidados Básicos de Saúde
        spe2 = SpecializationModel.objects.create(name=1)  # Apoio à Mobilidade
        self.caregiver.specializations.add(spe1)
        self.caregiver.specializations.add(spe2)

        url = reverse("specialization-list")
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) >= 2)
        names = [spec for spec in response.data["specializations"]]

        self.assertIn(spe1.get_name_display(), names)
        self.assertIn(spe2.get_name_display(), names)


# Test Models Qualification (Odair)
class QualificationModelTest(TestCase):

    def setUp(self):
        self.valid_data = {
            "name": "Certificate in Geriatric Care",
            "conclusion_date": timezone.now().date(),
            "file": "http://example.com/valid_certificate.pdf",
        }

    def test_create_valid_qualification(self):
        qualification = QualificationModel.objects.create(**self.valid_data)
        self.assertEqual(QualificationModel.objects.count(), 1)
        self.assertEqual(qualification.name, self.valid_data["name"])
        self.assertEqual(
            qualification.conclusion_date, self.valid_data["conclusion_date"]
        )

    def test_update_qualification(self):
        qualification = QualificationModel.objects.create(**self.valid_data)
        new_name = "Updated Certificate"

        new_conclusion_date = timezone.now().date()
        qualification.name = new_name
        qualification.conclusion_date = new_conclusion_date
        qualification.save()
        self.assertEqual(qualification.name, new_name)
        self.assertEqual(qualification.conclusion_date, new_conclusion_date)

    def test_invalid_qualification(self):
        invalid_data = {

            "name": "",
            "conclusion_date": timezone.now().date(),
            "file": "http://example.com/invalid_certificate.pdf",
        }
        qualification = QualificationModel(**self.valid_data)

        qualification.__dict__.update(invalid_data)

        with self.assertRaises(ValidationError):
            qualification.full_clean()

    def test_retrieve_qualification(self):

        qualification = QualificationModel.objects.create(**self.valid_data)
        retrieved_qualification = QualificationModel.objects.get(pk=qualification.pk)
        self.assertEqual(qualification.pk, retrieved_qualification.pk)
        self.assertEqual(qualification.name, retrieved_qualification.name)
        self.assertEqual(
            qualification.conclusion_date, retrieved_qualification.conclusion_date
        )

    def test_delete_qualification(self):
        qualification = QualificationModel.objects.create(**self.valid_data)
        qualification_id = qualification.pk
        qualification.delete()
        with self.assertRaises(QualificationModel.DoesNotExist):
            QualificationModel.objects.get(pk=qualification_id)



class CaregiverModelTest(TestCase):

    def setUp(self):
        self.user_data = {
            "email": "carlos@gmail.com",
            "name": "Carlos Ferreira",
            "picture": "string",
            "latitude": "10.000000",
            "longitude": "10.000000",
            "user_type": 1,
            "gender": 0,
            "preferred_contact": 0,
            "password": "123",
            "phone": "+5521999999999",
            "address": "a really cool place",
            "post_code": "66666666"
        }

        self.user = CustomUserModel.objects.create(**self.user_data)

        self.valid_data = {
            "user": self.user,
            "hour_price": Decimal(25.00),
            "day_price": Decimal(180.00),
            "max_request_km": 60,
            "career_time": 7,
            "additional_info": "Experienced with dementia care.",
        }

    def test_create_valid_caregiver_model(self):
        caregiver = CaregiverModel.objects.create(**self.valid_data)
        self.assertEqual(CaregiverModel.objects.count(), 1)

        for field, value in self.valid_data.items():
            if field == "user":
                self.assertEqual(str(caregiver.user.id), str(value.id))
            else:
                self.assertEqual(getattr(caregiver, field), value)

    def test_create_invalid_null_caregiver_model(self):
        wrong_caregiver_data = {
            "user": self.user,
            "hour_price": None,
            "career_time": None,
        }

        with self.assertRaises(IntegrityError):
            CaregiverModel.objects.create(**wrong_caregiver_data)
       

    def test_update_caregiver_model(self):
        caregiver = CaregiverModel.objects.create(**self.valid_data)
        new_hour_price = "95.00"
        new_additional_info = "Experienced with Elder"

        caregiver.hour_price = new_hour_price
        caregiver.additional_info = new_additional_info
        caregiver.save()
        self.assertEqual(caregiver.hour_price, new_hour_price)
        self.assertEqual(caregiver.additional_info, new_additional_info)

    def test_invalid_update_caregiver_model(self):
        wrong_caregiver_data = {
            "hour_price": "Not decimal",
            "day_price": "Not decimal",
            "max_request_km": "Not number",
            "career_time": "Not number",
        }

        caregiver = CaregiverModel.objects.create(**self.valid_data)

        for field, value in wrong_caregiver_data.items():
            setattr(caregiver, field, value)

            with self.assertRaises(ValidationError):
                caregiver.full_clean()
            
    def test_retrieve_caregiver_model(self):
        caregiver = CaregiverModel.objects.create(**self.valid_data)
        retrieved_caregiver = CaregiverModel.objects.get(pk=caregiver.pk)
        self.assertEqual(caregiver.pk, retrieved_caregiver.pk)
        self.assertEqual(caregiver.hour_price, retrieved_caregiver.hour_price)
        self.assertEqual(
            caregiver.additional_info, retrieved_caregiver.additional_info
        )

    def test_delete_caregiver_model(self):
        caregiver = CaregiverModel.objects.create(**self.valid_data)
        caregiver_id = caregiver.pk
        caregiver.delete()
        with self.assertRaises(QualificationModel.DoesNotExist):
            QualificationModel.objects.get(pk=caregiver_id)


class FixedUnavailableDayModelTest(TestCase):

    def setUp(self):
        self.valid_data = {
            "day": 0 
        }

    def test_create_valid_unavailable_day(self):
        unavailable_day = FixedUnavailableDayModel.objects.create(**self.valid_data)
        self.assertEqual(FixedUnavailableDayModel.objects.count(), 1)

        self.assertEqual(unavailable_day.day, self.valid_data["day"])

    def test_create_invalid_unavailable_day(self):
        invalid_data = {
            "day": None 
        }

        with self.assertRaises(IntegrityError):
            FixedUnavailableDayModel.objects.create(**invalid_data)

    def test_update_unavailable_day(self):
        unavailable_day = FixedUnavailableDayModel.objects.create(**self.valid_data)
        new_day = 1 

        unavailable_day.day = new_day
        unavailable_day.save()
        updated_unavailable_day = FixedUnavailableDayModel.objects.get(pk=unavailable_day.pk)

        self.assertEqual(updated_unavailable_day.day, new_day)

    def test_retrieve_unavailable_day(self):
        unavailable_day = FixedUnavailableDayModel.objects.create(**self.valid_data)
        retrieved_unavailable_day = FixedUnavailableDayModel.objects.get(pk=unavailable_day.pk)

        self.assertEqual(retrieved_unavailable_day.day, self.valid_data["day"])

    def test_delete_unavailable_day(self):
        unavailable_day = FixedUnavailableDayModel.objects.create(**self.valid_data)
        unavailable_day_id = unavailable_day.pk
        unavailable_day.delete()

        with self.assertRaises(FixedUnavailableDayModel.DoesNotExist):
            FixedUnavailableDayModel.objects.get(pk=unavailable_day_id)

class FixedUnavailableHourModelTest(TestCase):

    def setUp(self):
        self.valid_data = {
            "hour": 0 
        }

    def test_create_valid_unavailable_hour(self):
        unavailable_hour = FixedUnavailableHourModel.objects.create(**self.valid_data)
        self.assertEqual(FixedUnavailableHourModel.objects.count(), 1)

        self.assertEqual(unavailable_hour.hour, self.valid_data["hour"])

    def test_create_invalid_unavailable_hour(self):
        invalid_data = {
            "hour": None  
        }

        with self.assertRaises(IntegrityError):
            FixedUnavailableHourModel.objects.create(**invalid_data)

    def test_update_unavailable_hour(self):
        unavailable_hour = FixedUnavailableHourModel.objects.create(**self.valid_data)
        new_hour = 1

        unavailable_hour.hour = new_hour
        unavailable_hour.save()

        updated_unavailable_hour = FixedUnavailableHourModel.objects.get(pk=unavailable_hour.pk)

        self.assertEqual(updated_unavailable_hour.hour, new_hour)

    def test_retrieve_unavailable_hour(self):
        unavailable_hour = FixedUnavailableHourModel.objects.create(**self.valid_data)
        retrieved_unavailable_hour = FixedUnavailableHourModel.objects.get(pk=unavailable_hour.pk)

        self.assertEqual(retrieved_unavailable_hour.hour, self.valid_data["hour"])

    def test_delete_unavailable_hour(self):
        unavailable_hour = FixedUnavailableHourModel.objects.create(**self.valid_data)
        unavailable_hour_id = unavailable_hour.pk
        unavailable_hour.delete()

        with self.assertRaises(FixedUnavailableHourModel.DoesNotExist):
            FixedUnavailableHourModel.objects.get(pk=unavailable_hour_id)

class CustomUnavailableDayModelTest(TestCase):

    def setUp(self):
        self.valid_data = {
            "day": date(2024, 4, 8)
        }

    def test_create_valid_unavailable_day(self):
        unavailable_day = CustomUnavailableDayModel.objects.create(**self.valid_data)
        self.assertEqual(CustomUnavailableDayModel.objects.count(), 1)

        self.assertEqual(unavailable_day.day, self.valid_data["day"])

    def test_create_invalid_unavailable_day(self):
        invalid_data = {
            "day": None
        }

        with self.assertRaises(IntegrityError):
            CustomUnavailableDayModel.objects.create(**invalid_data)

    def test_update_unavailable_day(self):
        unavailable_day = CustomUnavailableDayModel.objects.create(**self.valid_data)
        new_day = date(2024, 4, 9)  

        unavailable_day.day = new_day
        unavailable_day.save()

        updated_unavailable_day = CustomUnavailableDayModel.objects.get(pk=unavailable_day.pk)

        self.assertEqual(updated_unavailable_day.day, new_day)

    def test_retrieve_unavailable_day(self):
        unavailable_day = CustomUnavailableDayModel.objects.create(**self.valid_data)
        retrieved_unavailable_day = CustomUnavailableDayModel.objects.get(pk=unavailable_day.pk)

        self.assertEqual(retrieved_unavailable_day.day, self.valid_data["day"])

    def test_delete_unavailable_day(self):
        unavailable_day = CustomUnavailableDayModel.objects.create(**self.valid_data)
        unavailable_day_id = unavailable_day.pk
        unavailable_day.delete()

        with self.assertRaises(CustomUnavailableDayModel.DoesNotExist):
            CustomUnavailableDayModel.objects.get(pk=unavailable_day_id)

# class RatingModelTests(TestCase):
#     def setUp(self):
#         # Preparando um usuário e uma solicitação de cuidado para o teste
#         self.user = CustomUserModel.objects.create_user(
#             username="testeUser",
#             email="teste@teste.com",
#             name="Teste User",
#             phone="+5511900000000",
#             address="Teste Address, 123",
#             post_code="12345678",
#             latitude="23.000000",
#             longitude="-43.000000",
#             user_type=2,
#             gender=1,
#             preferred_contact=1,
#             birth_date="1990-01-01",
#             password="testepassword123"
#         )
#         self.care_request = CareRequestModel.objects.create(user=self.user)
        
#         self.rating = RatingModel.objects.create(
#             care_request=self.care_request,
#             rating=5,
#             description="Excellent service!"
#         )

#     def test_rating_creation(self):
#         """Testa a criação de uma avaliação."""
#         self.assertEqual(self.rating.rating, 5)
#         self.assertEqual(self.rating.description, "Excellent service!")
#         self.assertEqual(self.rating.care_request, self.care_request)

#     def test_rating_update(self):
#         """Testa a atualização de uma avaliação."""
#         self.rating.rating = 4
#         self.rating.description = "Good service"
#         self.rating.save()
        
#         updated_rating = RatingModel.objects.get(id=self.rating.id)
#         self.assertEqual(updated_rating.rating, 4)
#         self.assertEqual(updated_rating.description, "Good service")

#     def test_rating_string_representation(self):
#         """Testa a representação em string do objeto Rating."""
#         self.assertEqual(str(self.rating), "5 - Excellent service!")

class CaregiverTests(APITestCase):
    def test_create_caregiver(self):
        url = reverse('caregiver-create')
        data = {
            "user": 1,  # id do user
            "hour_price": "50.00",
            "day_price": "400.00",
            "career_time": 5,
            "additional_info": "Informações adicionais"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)