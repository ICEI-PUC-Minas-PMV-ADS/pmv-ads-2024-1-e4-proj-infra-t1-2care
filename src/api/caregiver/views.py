from django.contrib.auth import authenticate
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

class CaregiverListView(
    generics.ListAPIView
):  # Não sei se essa url faz sentido já que vamos pegar do mongo, mas como não temos mongo ainda, ta ai.
    queryset = (
        CaregiverModel.objects.all()
    )  # lembrando que tem que implementar filtro tbm {query_params} quando passar pro mongo.
    serializer_class = CaregiverSerializer
    permission_classes = (AllowAny,)  # fixme precisa do user pra auth
    # authentication_classes =[JWTAuthentication]


class CaregiverEditView(APIView):
    queryset = CaregiverModel.objects.all()

    serializer_class = CaregiverSerializer
    authentication_classes = [JWTAuthentication]

    # como não temos a token ainda, não consigo direcionar pro usuario certo
    def put(self, request, format=None):
        caregiver = self.queryset.first()  # fixme

        serializer = CaregiverSerializer(caregiver, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, format=None):
        caregiver = self.queryset.first()  # fixme
        serializer = CaregiverSerializer(caregiver, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
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
    queryset = CaregiverModel.objects.all()
    serializer_class = CaregiverSerializer
    permission_classes = (AllowAny,)  # fixme precisa do user pra auth
    # authentication_classes =[JWTAuthentication]


class CaregiverCalendarView(generics.RetrieveAPIView):
    queryset = CaregiverModel.objects.all()
    serializer_class = CaregiverSerializer
    permission_classes = (AllowAny,)  # fixme precisa do user pra auth
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