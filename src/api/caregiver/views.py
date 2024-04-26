from django.contrib.auth import authenticate
from django.db import transaction
from api_2care.mongo_connection import MongoConnection
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import (
    CareRequestModel,
    CaregiverModel,
    RatingModel,
    SpecializationModel,
    QualificationModel,
)

from .serializers import (
    CareRequestSerializer,
    CaregiverSerializer,
    QualificationSerializer,
    RatingSerializer,
    SpecializationSerializer,
)

class MongoCaregiverListView(APIView):
    permission_classes = (AllowAny,) 
    def get(self, request):
        return Response(MongoConnection().get_data_on_mongo(), 200)

class CaregiverEditView(APIView):
    queryset = CaregiverModel.objects.all()

    serializer_class = CaregiverSerializer
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        caregiver = CaregiverModel.objects.filter(user=request.user).first()
        request.data["user"] = request.user.id
        update = False

        if not request.user.get_user_type_display() == "Caregiver":
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

        if not request.user.get_user_type_display() == "Caregiver":
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

        if not request.user.get_user_type_display() == "Caregiver":
            return Response("This user is not a Caregiver", status=status.HTTP_400_BAD_REQUEST)
        
        if caregiver:
            serializer = CaregiverSerializer(caregiver, data=request.data, partial=True)

            if serializer.is_valid():
                caregiver_instance = serializer.save()
                MongoConnection().set_caregiver_data_on_mongo(caregiver_instance, update=True)
                return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CaregiverSelfCalendarView(generics.RetrieveAPIView):
    queryset = CaregiverModel.objects.all()
    serializer_class = CaregiverSerializer
    authentication_classes = [JWTAuthentication]

    def retrieve(self, request, *args, **kwargs):
        instance = self.queryset.first()  # fixme
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


class QualificationCreateView(generics.CreateAPIView):
    queryset = QualificationModel.objects.all()
    serializer_class = QualificationSerializer
    authentication_classes = [JWTAuthentication]


class QualificationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = QualificationModel.objects.all()
    serializer_class = QualificationSerializer
    authentication_classes = [JWTAuthentication]


##### Specialization - Leo #####
class SpecializationListCreateView(generics.ListCreateAPIView):
    queryset = SpecializationModel.objects.all()
    serializer_class = SpecializationSerializer
    authentication_classes = [JWTAuthentication]


class SpecializationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SpecializationModel.objects.all()
    serializer_class = SpecializationSerializer
    
class CareRequestListCreateView(generics.ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    queryset = CareRequestModel.objects.all()
    serializer_class = CareRequestSerializer


class CareRequestDetailView(generics.RetrieveAPIView):
    authentication_classes = [JWTAuthentication]
    queryset = CareRequestModel.objects.all()
    serializer_class = CareRequestSerializer


class CareRequestAcceptView(APIView):
    authentication_classes = [JWTAuthentication]

    def post(self, request, pk):
        care_request = CareRequestModel.objects.get(pk=pk)
        care_request.status = 2  # Autorizado
        care_request.save()
        return Response({"status": "accepted"}, status=status.HTTP_200_OK)


class CareRequestDeclineView(APIView):
    authentication_classes = [JWTAuthentication]

    def post(self, request, pk):
        care_request = CareRequestModel.objects.get(pk=pk)
        care_request.status = 1  # Recusado
        care_request.save()
        return Response({"status": "declined"}, status=status.HTTP_200_OK)


class RatingCreateView(generics.CreateAPIView):
    queryset = RatingModel.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = [JWTAuthentication]


class RatingDetailView(generics.RetrieveAPIView):
    queryset = RatingModel.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = [JWTAuthentication]