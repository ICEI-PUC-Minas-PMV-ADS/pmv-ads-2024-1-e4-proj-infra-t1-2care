from django.test import TestCase

from .models import (
    CareReceiverModel,
)
from user.models import (
    CustomUserModel
)
from .serializers import (
    CareReceiverSerializer,
)

# CareReceiver Tests
class CareReceiverModelTests(TestCase):

    def setUp(self):
        self.user = CustomUserModel.objects.create_user(
            email= "teste@teste.com",
            name= "Teste User",
            phone= "+5511900000000",
            address= "Teste Address, 123",
            post_code= "12345678",
            latitude= "23.000000",
            longitude= "-43.000000",
            user_type= 2,
            gender= 1,
            preferred_contact= 1,
            birth_date= "1990-01-01",
            password= "testepassword123"
        )
        
        # Dados para criar um CareReceiver
        self.care_receiver_data = {
            'user': self.user,
            'emergency_contact': '+5511912345678',
            'share_special_care': True,
            'additional_info': 'Needs special care with medication'
        }

    def test_create_care_receiver(self):
        care_receiver = CareReceiverModel.objects.create(**self.care_receiver_data)
        self.assertEqual(CareReceiverModel.objects.count(), 1)
        self.assertEqual(care_receiver.user, self.user)
        self.assertEqual(care_receiver.emergency_contact, '+5511912345678')

    def test_update_care_receiver(self):
        care_receiver = CareReceiverModel.objects.create(**self.care_receiver_data)
        new_emergency_contact = '+5511987654321'
        care_receiver.emergency_contact = new_emergency_contact
        care_receiver.save()
        
        updated_care_receiver = CareReceiverModel.objects.get(id=care_receiver.id)
        self.assertEqual(updated_care_receiver.emergency_contact, new_emergency_contact)

    def test_delete_care_receiver(self):
        care_receiver = CareReceiverModel.objects.create(**self.care_receiver_data)
        care_receiver_id = care_receiver.id
        care_receiver.delete()
        
        with self.assertRaises(CareReceiverModel.DoesNotExist):
            CareReceiverModel.objects.get(id=care_receiver_id)

    def test_care_receiver_string_representation(self):
        care_receiver = CareReceiverModel.objects.create(**self.care_receiver_data)
        expected_string_representation = f"{self.user.name} - Care Receiver"
        self.assertEqual(str(care_receiver), expected_string_representation)

class CareReceiverSerializerTests(TestCase):

    def setUp(self):
        self.user = CustomUserModel.objects.create_user(
            email="teste@teste.com",
            name="Teste User",
            phone="+5511900000000",
            address="Teste Address, 123",
            post_code="12345678",
            latitude="23.000000",
            longitude="-43.000000",
            user_type=2,
            gender=1,
            preferred_contact=1,
            birth_date="1990-01-01",
            password="testepassword123"
        )

        self.care_receiver_data = {
            'user': self.user.id,
            'emergency_contact': '+5511987654321',
            'share_special_care': True,
            'additional_info': 'Additional info'
        }

    def test_serialize_care_receiver(self):
        care_receiver = CareReceiverModel.objects.create(
            user=self.user,
            emergency_contact='+5511987654321',
            share_special_care=True,
            additional_info='Additional info'
        )
        serializer = CareReceiverSerializer(care_receiver)
        self.assertEqual(serializer.data['emergency_contact'], care_receiver.emergency_contact)
        self.assertEqual(serializer.data['share_special_care'], care_receiver.share_special_care)

    def test_create_care_receiver_via_serializer(self):
        serializer = CareReceiverSerializer(data=self.care_receiver_data)
        self.assertTrue(serializer.is_valid())
        serializer.save()

        self.assertEqual(CareReceiverModel.objects.count(), 1)
        care_receiver = CareReceiverModel.objects.get()
        self.assertEqual(care_receiver.emergency_contact, self.care_receiver_data['emergency_contact'])
        self.assertEqual(care_receiver.user, self.user)

    def test_update_care_receiver_via_serializer(self):
        care_receiver = CareReceiverModel.objects.create(
            user=self.user,
            emergency_contact='+5511987654321',
            share_special_care=True,
            additional_info='Initial info'
        )
        update_data = {'additional_info': 'Updated info'}
        serializer = CareReceiverSerializer(care_receiver, data=update_data, partial=True)

        self.assertTrue(serializer.is_valid())
        serializer.save()
        care_receiver.refresh_from_db()

        self.assertEqual(care_receiver.additional_info, 'Updated info')

    def test_validation_error_with_invalid_data(self):
        invalid_data = self.care_receiver_data.copy()
        invalid_data['emergency_contact'] = 'invalid phone number'
        serializer = CareReceiverSerializer(data=invalid_data)

        self.assertFalse(serializer.is_valid())
        self.assertIn('emergency_contact', serializer.errors)

# class CareReceiverViewTests(APITestCase):
#     def setUp(self):
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
#         self.care_receiver = CareReceiverModel.objects.create(
#             user=self.user,
#             emergency_contact='+5511987654321',
#             share_special_care=True,
#             additional_info='Needs special care'
#         )
#         self.client.login(email='teste@teste.com', password='testepassword123')

#     def test_get_care_receiver(self):
#         url = reverse('carereceiver-detail', args=[self.care_receiver.pk])
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data['emergency_contact'], self.care_receiver.emergency_contact)

#     def test_create_care_receiver(self):
#         self.client.force_authenticate(user=self.user)  # Garante que o usuário está autenticado
#         url = reverse('carereceiver-create')  # Este é o nome correto, sem argumentos esperados
#         data = {
#         "user": self.user.id,
#         "emergency_contact": "+5511987654322",
#         "share_special_care": False,
#         "additional_info": "No special care needed"
#         }
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)  # Confirma que o objeto foi criado
#         self.assertEqual(CareReceiverModel.objects.count(), 2)
#         self.assertEqual(CareReceiverModel.objects.last().emergency_contact, data['emergency_contact'])

#     def test_update_care_receiver(self):
#         url = reverse('carereceiver-detail', args=[self.care_receiver.pk])
#         data = {"additional_info": "Updated special care needed"}
#         response = self.client.patch(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.care_receiver.refresh_from_db()
#         self.assertEqual(self.care_receiver.additional_info, data['additional_info'])

#     def test_delete_care_receiver(self):
#         url = reverse('carereceiver-detail', args=[self.care_receiver.pk])
#         response = self.client.delete(url)
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
#         self.assertEqual(CareReceiverModel.objects.count(), 0)

# class CareReceiverIntegrationTests(APITestCase):
#     def setUp(self):
#         # Cria um usuário para ser usado nos testes
#         self.user_data = {
#             "username": "testuser",
#             "email": "testuser@example.com",
#             "password": "password123",
#             "name": "Test User",
#             "phone": "+5511900000000",
#             "address": "123 Test St",
#             "post_code": "123456",
#             "latitude": "23.000000",
#             "longitude": "-43.000000",
#             "user_type": 2,
#             "gender": 1,
#             "preferred_contact": 1,
#             "birth_date": "1990-01-01",
#         }
#         self.user = CustomUserModel.objects.create_user(**self.user_data)
#         self.client.force_authenticate(user=self.user)  # Autentica o usuário para os testes

#     def test_care_receiver_crud_operations(self):
#         # Testa a criação de um CareReceiver
#         create_url = reverse('carereceiver-create')
#         create_data = {
#             "user": self.user.pk,  # Adiciona o ID do usuário
#             "emergency_contact": "+5511987654321",
#             "share_special_care": True,
#             "additional_info": "Needs special care"
#         }
#         response = self.client.post(create_url, create_data, format='json')
#         print(response.data)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertTrue(CareReceiverModel.objects.exists())

#         care_receiver_id = response.data['id']

#         # Testa a recuperação de um CareReceiver
#         retrieve_url = reverse('carereceiver-detail', args=[care_receiver_id])
#         response = self.client.get(retrieve_url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data['emergency_contact'], create_data['emergency_contact'])

#         # Testa a atualização de um CareReceiver
#         update_data = {"additional_info": "Updated special care needed"}
#         response = self.client.patch(retrieve_url, update_data, format='json')
#         print(response.data)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(CareReceiverModel.objects.get(pk=care_receiver_id).additional_info, update_data['additional_info'])

#         # Testa a exclusão de um CareReceiver
#         response = self.client.delete(retrieve_url)
#         print(response.data)
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
#         self.assertFalse(CareReceiverModel.objects.filter(pk=care_receiver_id).exists())