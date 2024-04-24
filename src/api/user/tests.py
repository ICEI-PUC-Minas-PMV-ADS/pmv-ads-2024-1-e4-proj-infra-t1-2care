from django.test import TestCase

from django.forms import ValidationError
from django.test import TestCase
from django.contrib.auth.hashers import check_password, make_password

from .models import (
    CustomUserModel
)
from .serializers import (
    UserSerializer,
)

# CustomUser Tests
class CustomUserModelTest(TestCase):

    def setUp(self):
        self.user_data = {
            "email": "teste@teste.com",
            "name": "Teste User",
            "phone": "+5511900000000",
            "address": "Teste Address, 123",
            "post_code": "12345678",
            "latitude": "23.000000",
            "longitude": "-43.000000",
            "user_type": 1,
            "gender": 1,
            "preferred_contact": 1,
            "birth_date": "1990-01-01",
            "password": "testepassword123"
        }

    def test_create_user(self):
        user = CustomUserModel.objects.create_user(**self.user_data)
        self.assertEqual(CustomUserModel.objects.count(), 1)
        self.assertEqual(user.email, self.user_data["email"])
        self.assertTrue(check_password(self.user_data["password"], user.password))

    def test_create_superuser(self):
        superuser_data = self.user_data.copy()
        superuser_data.update({"email": "superuser@teste.com"})
        user = CustomUserModel.objects.create_superuser(**superuser_data)
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)

    def test_user_string_representation(self):
        user = CustomUserModel.objects.create(**self.user_data)
        self.assertEqual(str(user), user.name)

    def test_email_uniqueness(self):
        CustomUserModel.objects.create(**self.user_data)
        with self.assertRaises(ValidationError):
            new_user_data = self.user_data.copy()
            user = CustomUserModel(**new_user_data)
            user.full_clean()

    def test_user_update(self):
        user = CustomUserModel.objects.create(**self.user_data)
        user.name = "Updated Name"
        user.save()
        updated_user = CustomUserModel.objects.get(id=user.id)
        self.assertEqual(updated_user.name, "Updated Name")

    def test_user_delete(self):
        user = CustomUserModel.objects.create(**self.user_data)
        user_id = user.id
        user.delete()
        with self.assertRaises(CustomUserModel.DoesNotExist):
            CustomUserModel.objects.get(id=user_id)

# class UserSerializerTests(APITestCase):

#     def setUp(self):
#         self.user_data = {
#             "username": "userTest",
#             "email": "user@test.com",
#             "name": "User Test",
#             "password": "password",
#             "phone": "+5511999999999",
#             "address": "Test Street, 123",
#             "post_code": "12345678",
#             "latitude": "23.555500",
#             "longitude": "-46.555500",
#             "user_type": 1,
#             "gender": 1,
#             "preferred_contact": 1,
#             "birth_date": "1990-01-01",
#         }
#         self.user = CustomUserModel.objects.create_user(**self.user_data)
#         self.client = APIClient()

#     def test_serialize_user(self):
#         user = CustomUserModel.objects.get(email=self.user_data['email'])
#         serializer = UserSerializer(user)
#         for field in self.user_data:
#             if field == 'password':
#                 continue  # Password is write_only
#             self.assertEqual(serializer.data[field], self.user_data[field])

#     def test_create_user_via_serializer(self):
#         new_user_data = {
#             "username": "newUser",
#             "email": "newuser@test.com",
#             "name": "New User",
#             "password": "newpassword",
#             "phone": "+5511988888888",
#             "address": "New Street, 456",
#             "post_code": "87654321",
#             "latitude": "23.666600",
#             "longitude": "-46.666600",
#             "user_type": 2,
#             "gender": 2,
#             "preferred_contact": 2,
#             "birth_date": "1991-02-02",
#         }
#         serializer = UserSerializer(data=new_user_data)
#         self.assertTrue(serializer.is_valid())
#         serializer.save()
#         self.assertEqual(CustomUserModel.objects.count(), 2)
#         user = CustomUserModel.objects.get(email=new_user_data['email'])
#         for field in new_user_data:
#             if field == 'password':
#                 self.assertTrue(user.check_password(new_user_data['password']))
#             else:
#                 self.assertEqual(getattr(user, field), new_user_data[field])

# class UserViewTests(APITestCase):

#     def setUp(self):
#         self.user_data = {
#             "username": "userTest",
#             "email": "user@test.com",
#             "name": "User Test",
#             "password": "password",
#             "phone": "+5511999999999",
#             "address": "Test Street, 123",
#             "post_code": "12345678",
#             "latitude": "23.5555",
#             "longitude": "-46.5555",
#             "user_type": 1,
#             "gender": 1,
#             "preferred_contact": 1,
#             "birth_date": "1990-01-01",
#         }
#         self.user = CustomUserModel.objects.create_user(**self.user_data)
#         self.client = APIClient()

#     def test_create_user_api(self):
#         url = reverse('register')
#         response = self.client.post(url, self.user_data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(CustomUserModel.objects.count(), 2)  # Including setUp user

#     def test_user_login_api(self):
#         url = reverse('token_obtain_pair')
#         response = self.client.post(url, {"email": self.user_data['email'], "password": self.user_data['password']}, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn("access", response.data)

#     def test_user_update_api(self):
#         self.client.force_authenticate(user=self.user)
#         url = reverse('user-detail', kwargs={'pk': self.user.pk})
#         updated_data = {"name": "Updated Name"}
#         response = self.client.patch(url, updated_data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.user.refresh_from_db()
#         self.assertEqual(self.user.name, updated_data['name'])