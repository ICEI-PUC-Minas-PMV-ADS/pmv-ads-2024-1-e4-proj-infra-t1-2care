from django.contrib.auth import authenticate
from django.db import transaction
from api_2care.mongo_connection import MongoConnection
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from datetime import datetime, timedelta

from .models import (
    CareRequestModel,
    CaregiverModel,
    RatingModel,
    SpecializationModel,
    QualificationModel,
    WorkExperienceModel,
)
from user.models import CustomUserModel

from careReceiver.models import CareReceiverModel

from .serializers import (
    CareRequestSerializer,
    CaregiverSerializer,
    QualificationSerializer,
    RatingSerializer,
    RatingListSerializer,
    SpecializationSerializer,
    WorkExperienceSerializer,
    CalendarSerializer
)


class MongoCaregiverListView(APIView):
    permission_classes = (AllowAny,) 
    def get(self, request):
        return Response(MongoConnection().get_data_on_mongo(), 200)

class CaregiverEditView(APIView):
    queryset = CaregiverModel.objects.all()
    serializer_class = CaregiverSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        caregiver = CaregiverModel.objects.filter(user=request.user).first()
        request.data["user"] = request.user.id
        update = False

        if request.user.get_user_type_display() != "Caregiver":
            return Response("This user is not a Caregiver", status=status.HTTP_400_BAD_REQUEST)
        
        if caregiver:
            update = True
            serializer = CaregiverSerializer(caregiver, data=request.data)
        else:
            serializer = self.serializer_class(data=request.data)
    
        if serializer.is_valid():
            caregiver_instance = serializer.save()
            MongoConnection().set_caregiver_data_on_mongo(caregiver_instance, update)
            return Response(serializer.data, status=status.HTTP_201_CREATED if not caregiver else status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, format=None):
        caregiver = CaregiverModel.objects.filter(user=request.user).first()

        if request.user.get_user_type_display() != "Caregiver":
            return Response("This user is not a Caregiver", status=status.HTTP_400_BAD_REQUEST)
        
        if caregiver:
            serializer = CaregiverSerializer(caregiver, data=request.data)
            if serializer.is_valid():
                caregiver_instance = serializer.save()
                MongoConnection().set_caregiver_data_on_mongo(caregiver_instance, update=True)
                return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, format=None):
        caregiver = CaregiverModel.objects.filter(user=request.user).first()

        if request.user.get_user_type_display() != "Caregiver":
            return Response("This user is not a Caregiver", status=status.HTTP_400_BAD_REQUEST)
        
        if caregiver:
            serializer = CaregiverSerializer(caregiver, data=request.data, partial=True)

            if serializer.is_valid():
                caregiver_instance = serializer.save()
                MongoConnection().set_caregiver_data_on_mongo(caregiver_instance, update=True)
                return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CaregiverSelfCalendarView(generics.RetrieveAPIView):
    model = CaregiverModel
    serializer_class = CaregiverSerializer
    authentication_classes = [JWTAuthentication]

    def retrieve(self, request, *args, **kwargs):
        instance = get_object_or_404(self.model, user=self.request.user)
        serializer = self.get_serializer(instance)

        calendar = {
            "fixed_unavailable_days": serializer.data.get("fixed_unavailable_days", []),
            "fixed_unavailable_hours": serializer.data.get(
                "fixed_unavailable_hours", []
            ),
            "custom_unavailable_days": serializer.data.get(
                "custom_unavailable_days", []
            ),
        }

        return Response(calendar)

class CaregiverCreateView(generics.CreateAPIView):
    queryset = CaregiverModel.objects.all()
    serializer_class = CaregiverSerializer

class CaregiverDetailView(generics.RetrieveAPIView):
    serializer_class = CaregiverSerializer
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return None

    def get_object(self):
        return get_object_or_404(CaregiverModel, user=self.request.user)

class CaregiverCalendarView(generics.RetrieveAPIView):
    queryset = CaregiverModel.objects.all()
    serializer_class = CaregiverSerializer
    authentication_classes = [JWTAuthentication]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        calendar = {
            "fixed_unavailable_days": serializer.data.get("fixed_unavailable_days", []),
            "fixed_unavailable_hours": serializer.data.get(
                "fixed_unavailable_hours", []
            ),
            "custom_unavailable_days": serializer.data.get(
                "custom_unavailable_days", []
            ),
        }

        return Response(calendar)


# Qualification (Odair)


class QualificationListCreateView(generics.ListCreateAPIView):
    queryset = QualificationModel.objects.all()
    serializer_class = QualificationSerializer
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = get_object_or_404(CustomUserModel, id=self.request.user.id)

        if not user.get_user_type_display() == "Caregiver":
            return Response("This user is not a Caregiver", status=status.HTTP_400_BAD_REQUEST)
        
        caregiver = get_object_or_404(CaregiverModel, user=user)
        if caregiver:
            return Response({"status": "success", "qualifications": self.serializer_class(caregiver.qualifications.all(), many=True).data}, status=200)

        return SpecializationModel.objects.none()

    def post(self, request, *args, **kwargs):
        user = get_object_or_404(CustomUserModel, id=self.request.user.id)

        if not user.get_user_type_display() == "Caregiver":
            return Response("This user is not a Caregiver", status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            try:
                with transaction.atomic():
                    qualification = serializer.save()
                    caregiver, created = CaregiverModel.objects.get_or_create(user=user, defaults={'hour_price': 0})
                    caregiver.qualifications.add(qualification)
                    MongoConnection().set_caregiver_data_on_mongo(caregiver, update=True)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
            except:
                return Response("Something went wrong.", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class QualificationSelfList(generics.ListAPIView):
    queryset = QualificationModel.objects.all()
    serializer_class = QualificationSerializer
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = get_object_or_404(CustomUserModel, id=self.request.user.id)

        if not user.get_user_type_display() == "Caregiver":
            return Response("This user is not a Caregiver", status=status.HTTP_400_BAD_REQUEST)
        
        caregiver = get_object_or_404(CaregiverModel, user=user)
        if caregiver:
            return Response({"status": "success", "qualifications": self.serializer_class(caregiver.qualifications.all(), many=True).data}, status=200)

        return SpecializationModel.objects.none()

class QualificationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = QualificationModel.objects.all()
    serializer_class = QualificationSerializer
    authentication_classes = [JWTAuthentication]

    def delete(self, request, pk):
        user = get_object_or_404(CustomUserModel, id=self.request.user.id)

        if not user.get_user_type_display() == "Caregiver":
            return Response("This user is not a Caregiver", status=status.HTTP_400_BAD_REQUEST)
      
        if(pk):
            caregiver = get_object_or_404(CaregiverModel, user=user)
            qualification = caregiver.qualifications.filter(id=pk)
            if qualification.count() == 1:
                qualification.delete()
                return Response({"status": "success", "qualification": pk}, status=200)
            else:
                return Response("Qualificação não encontrada", status=status.HTTP_404_NOT_FOUND)  
        else:
            return Response("Something went wrong.", status=status.HTTP_500_INTERNAL_SERVER_ERROR)


##### Specialization - Leo #####

class AddSpecialization(APIView):
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        data = request.data
        user = get_object_or_404(CustomUserModel, id=self.request.user.id)
        if not user.get_user_type_display() == "Caregiver":
            return Response("This user is not a Caregiver", status=status.HTTP_400_BAD_REQUEST)
        specialization = get_object_or_404(SpecializationModel, name=data)
        caregiver, created = CaregiverModel.objects.get_or_create(user=user, defaults={'hour_price': 0})
        caregiver.specializations.add(specialization)
        MongoConnection().set_caregiver_data_on_mongo(caregiver, update=True)
        
        return Response({"status": "success", "specialization": specialization.get_name_display()}, status=200)
    
class RemoveSpecialization(APIView):
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        data = request.data
        user = get_object_or_404(CustomUserModel, id=self.request.user.id)

        if not user.get_user_type_display() == "Caregiver":
            return Response("This user is not a Caregiver", status=status.HTTP_400_BAD_REQUEST)

        specialization = ""
        for value, specialization_text in SpecializationModel.SPECIALIZATION:

            if specialization_text == data:
                specialization = get_object_or_404(SpecializationModel, name=value)

        if(specialization):
            caregiver = get_object_or_404(CaregiverModel, user=user)
            caregiver.specializations.remove(specialization)
            
            return Response({"status": "success", "specialization": specialization.get_name_display()}, status=200)
        else:
            return Response("Something went wrong.", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
class SpecializationListCreateView(generics.ListCreateAPIView):
    queryset = SpecializationModel.objects.all()
    serializer_class = SpecializationSerializer
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = get_object_or_404(CustomUserModel, id=self.request.user.id)

        if not user.get_user_type_display() == "Caregiver":
            return Response("This user is not a Caregiver", status=status.HTTP_400_BAD_REQUEST)
        
        caregiver = get_object_or_404(CaregiverModel, user=user)
        if caregiver:
            return Response({"status": "success", "specializations": [SpecializationModel.SPECIALIZATION[vl][1] for vl in caregiver.specializations.all().values_list("name", flat=True)]}, status=200)

        return SpecializationModel.objects.none()


class SpecializationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SpecializationModel.objects.all()
    serializer_class = SpecializationSerializer
    
class CareRequestListCreateView(generics.ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    model = CareRequestModel
    serializer_class = CareRequestSerializer

    def get(self, request):
        user = get_object_or_404(CustomUserModel, id=self.request.user.id)
        queryset = self.model.objects.all()
        caregiver, careReceiver = None, None
        today = datetime.today()

        if user.get_user_type_display() == "Caregiver":
            caregiver = get_object_or_404(CaregiverModel, user=user)
        else:
            careReceiver = get_object_or_404(CareReceiverModel, user=user)

        if caregiver:
            queryset = queryset.filter(caregiver=caregiver)
        else:
            queryset = queryset.filter(carereceiver=careReceiver)

        queryset.filter(status=0, date=today.date()).update(status=3)

        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        today = datetime.today()
        if not request.data:
            return Response("Invalid data", status=status.HTTP_400_BAD_REQUEST)
        
        user = get_object_or_404(CustomUserModel, id=self.request.user.id)

        if not request.user.get_user_type_display() == "CareReceiver":
            return Response("This user is not a Care Receiver", status=status.HTTP_400_BAD_REQUEST)
        
        careReceiver = get_object_or_404(CareReceiverModel, user=user)
        caregiver = get_object_or_404(CaregiverModel, id=self.request.data.get('caregiver', None))

        start_time_obj = datetime.strptime(request.data.get('startTime'), '%H:%M').time()
        if start_time_obj == today.date():
            return Response("You can't make requests for the same day", status=status.HTTP_400_BAD_REQUEST)

        end_time_obj = datetime.strptime(request.data.get('endTime'), '%H:%M').time()
        start_datetime = datetime.combine(datetime.today(), start_time_obj)
        end_datetime = datetime.combine(datetime.today(), end_time_obj)
        total_hours = (end_datetime - start_datetime).seconds // 3600

        final_price = total_hours * caregiver.hour_price

        care_request = CareRequestModel(
            date=request.data.get('date'),
            start_time=start_time_obj,
            end_time=end_time_obj,
            total_hours=total_hours,
            final_price=final_price,
            status=0,
            caregiver=caregiver,
            carereceiver=careReceiver
        )
        care_request.save()

        serializer = CareRequestSerializer(care_request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CareRequestDetailView(generics.RetrieveAPIView):
    authentication_classes = [JWTAuthentication]
    queryset = CareRequestModel.objects.all()
    serializer_class = CareRequestSerializer


class CareRequestDeclineView(APIView):
    authentication_classes = [JWTAuthentication]

    def get(self, request, pk):
        today = datetime.now()
        user = get_object_or_404(CustomUserModel, id=self.request.user.id)

        if not user.get_user_type_display() == "Caregiver":
            return Response("This user is not a Caregiver", status=status.HTTP_400_BAD_REQUEST)

        caregiver = get_object_or_404(CaregiverModel, user=user)
        care_request = get_object_or_404(CareRequestModel, pk=pk)
        if care_request.caregiver == caregiver:
            care_request.status = 1  # Recusado
            care_request.response_date = today
            care_request.save()
            return Response({"status": "Declined"}, status=status.HTTP_200_OK)
        else:
            return Response("This user is not the Caregiver nor the Care receiver of this request", status=status.HTTP_400_BAD_REQUEST)


class CareRequestAcceptView(APIView):
    authentication_classes = [JWTAuthentication]

    def get(self, request, pk):
        today = datetime.now()
        user = get_object_or_404(CustomUserModel, id=self.request.user.id)

        if not user.get_user_type_display() == "Caregiver":
            return Response("This user is not a Caregiver", status=status.HTTP_400_BAD_REQUEST)
        
        caregiver = get_object_or_404(CaregiverModel, user=user)
        care_request = get_object_or_404(CareRequestModel, pk=pk)
        if care_request.caregiver == caregiver:
            care_request.status = 2  # Autorizado
            care_request.response_date = today
            care_request.save()
            return Response({"status": "accepted"}, status=status.HTTP_200_OK)
        else:
            return Response("This user is not the Caregiver of this request", status=status.HTTP_400_BAD_REQUEST)
        
class CareRequestCancelView(APIView):
    authentication_classes = [JWTAuthentication]

    def get(self, request, pk):
        today = datetime.now()
        user = get_object_or_404(CustomUserModel, id=self.request.user.id)

        if not user.get_user_type_display() == "CareReceiver":
            return Response("This user is not a CareReceiver", status=status.HTTP_400_BAD_REQUEST)
        
        careReceiver = get_object_or_404(CareReceiverModel, user=user)
        care_request = get_object_or_404(CareRequestModel, pk=pk)
        if care_request.carereceiver == careReceiver:
            care_request.status = 3  # Cancelada
            care_request.response_date = today
            care_request.save()
            return Response({"status": "cancelled"}, status=status.HTTP_200_OK)
        else:
            return Response("This user is not the Care Receiver of this request", status=status.HTTP_400_BAD_REQUEST)

    
class RatingAllowCountView(APIView):
    authentication_classes = [JWTAuthentication]

    def post(self, request):

        if not self.request.data:
            return Response("False", status=status.HTTP_200_OK)
        care_requests = CareRequestModel.objects.filter(caregiver=request.data, status=2, carereceiver__user=self.request.user.id)
 
        ratings_count = care_requests.exclude(ratingmodel__id=None).values_list("ratingmodel__id", flat=True).count()

        return Response(True if care_requests.count() > ratings_count else False, status=status.HTTP_200_OK)


class RatingListView(generics.ListAPIView):
    serializer_class = RatingListSerializer
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        user = get_object_or_404(CustomUserModel, id=self.request.user.id)

        if user.get_user_type_display() == "CareReceiver":
            careReceiver = get_object_or_404(CareReceiverModel, user=user)
            return RatingModel.objects.filter(care_request__carereceiver=careReceiver)
        
        else:
            caregiver = get_object_or_404(CaregiverModel, user=user)
            return RatingModel.objects.filter(care_request__caregiver=caregiver)

class RatingCreateView(generics.CreateAPIView):
    queryset = RatingModel.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = [JWTAuthentication]

    def post(self, request):

        if not self.request.data.get("caregiverId", None):
            return Response("Cuidador não encontrado", status=status.HTTP_404_NOT_FOUND)
        
        careReceiver = get_object_or_404(CareReceiverModel, user=self.request.user)
        caregiver = get_object_or_404(CaregiverModel, pk=self.request.data.pop("caregiverId"))
        care_request = CareRequestModel.objects.filter(caregiver=caregiver, status=2, carereceiver=careReceiver, ratingmodel__id=None).order_by("date").first()

        if not care_request:
            return Response("Registro de cuidado não encontrado", status=status.HTTP_404_NOT_FOUND)
        
        request.data["care_request"] = str(care_request.pk)
        
        serializer = RatingSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            MongoConnection().set_caregiver_data_on_mongo(caregiver, update=True)
            return Response(serializer.data)
        
        return Response("Something went wrong.", status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RatingDetailView(generics.RetrieveAPIView):
    queryset = RatingModel.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = [JWTAuthentication]    


class WorkExperienceListCreateView(generics.ListCreateAPIView):
    queryset = WorkExperienceModel.objects.all()
    serializer_class = WorkExperienceSerializer
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = get_object_or_404(CustomUserModel, id=self.request.user.id)

        if not user.get_user_type_display() == "Caregiver":
            return Response("This user is not a Caregiver", status=status.HTTP_400_BAD_REQUEST)
        
        caregiver = get_object_or_404(CaregiverModel, user=user)
        if caregiver:
            return Response({"status": "success", "work_experience": self.serializer_class(caregiver.work_exp.all(), many=True).data}, status=200)

        return WorkExperienceModel.objects.none()

    def post(self, request, *args, **kwargs):
        user = get_object_or_404(CustomUserModel, id=self.request.user.id)

        if not user.get_user_type_display() == "Caregiver":
            return Response("This user is not a Caregiver", status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            try:
                with transaction.atomic():
                    work_exp = serializer.save()
                    caregiver, created = CaregiverModel.objects.get_or_create(user=user, defaults={'hour_price': 0})
                    caregiver.work_exp.add(work_exp)
                    MongoConnection().set_caregiver_data_on_mongo(caregiver, update=True)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
            except:
                return Response("Something went wrong.", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WorkExperienceRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = WorkExperienceModel.objects.all()
    serializer_class = WorkExperienceSerializer
    authentication_classes = [JWTAuthentication]

    def delete(self, request, pk):
        user = get_object_or_404(CustomUserModel, id=self.request.user.id)

        if not user.get_user_type_display() == "Caregiver":
            return Response("This user is not a Caregiver", status=status.HTTP_400_BAD_REQUEST)
      
        if(pk):
            caregiver = get_object_or_404(CaregiverModel, user=user)
            work_exp = caregiver.work_exp.filter(id=pk)
            if work_exp.count() == 1:
                work_exp.delete()
                return Response({"status": "success", "work_experience": pk}, status=200)
            else:
                return Response("Experiencia de trabalho não encontrada", status=status.HTTP_404_NOT_FOUND)  
        else:
            return Response("Something went wrong.", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CalendarUpdateAPIView(APIView):
    serializer_class = CalendarSerializer
    def put(self, request):
    
        user = get_object_or_404(CustomUserModel, id=self.request.user.id)
        if not user.get_user_type_display() == "Caregiver":
            return Response("This user is not a Caregiver", status=status.HTTP_400_BAD_REQUEST)
        caregiver = get_object_or_404(CaregiverModel, user=user)
        serializer = self.serializer_class(caregiver, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            MongoConnection().set_caregiver_data_on_mongo(caregiver, update=True)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
