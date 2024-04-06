from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout
from django.http import HttpResponse
import pymongo
from pymongo import MongoClient

from .models import Greeting, Caregiver, Specialization, Qualification, Carereceiver
from .serializers import (
    GreetingSerializer,
    CaregiverSerializer,
    QualificationSerializer,
    SpecializationSerializer,
    CarereceiverSerializer,
    UserSerializer,
)

class GreetingList(APIView):
    def get(self, request):
        greetings = Greeting.objects.all()
        serializer = GreetingSerializer(greetings, many=True)
        return Response(serializer.data)
    
class MongoUpdate(APIView):
    #temos que ver tudo que vai ser necessario ainda. por hora vou só salvar todos os caregivers no mongo, mas depois precisamos fazer updates ao alterar caregiver e create ao criar usuario
    #ou colocar algum scheduler pra re atualizar tudo de tempos em tempos
    #vou deixar na nuvem por hora até de fato colocarmos na VPS, se não fica ruim do pessoal trabalhar.

    def get(self, request):
        #collection.insert_one() #collection.find(),  #collection.find_one(), #collection.delete_one(), #collection.delete_many(),  #collection.delete_one(),   #collection.update_many()
        cluster = MongoClient(f"mongodb+srv://twocare:rb7NxWFV2fuAOzyBDRmpXbvmmuZvhYv7@2care.2cwas5l.mongodb.net/?retryWrites=true&w=majority&appName=2care")
        #quando for passar pra prod e rodar o mongo local, salvar a auth apenas no .env e não subir para o git, e se for manter na nuvem, deletar credenciais e criar novas e usar .env tbm 

        db = cluster["2care"]
        collection = db["caregivers"]
        collection.delete_many({})

        caregivers = Caregiver.objects.prefetch_related("qualifications", "work_exp", "specializations", "fixed_unavailable_days", "fixed_unavailable_hours", "custom_unavailable_days").all()
        caregiversData = []
        for caregiver in caregivers:
            caregiver_data = {
                "_id": str(caregiver.id),
                #"name": , precisa do user
                #"picture": , precisa do user
                #"latitude": , precisa do user
                #"longitude": , precisa do user
                #"gender": , precisa do user
                #"birth_date": , precisa do user
                "hour_price": float(caregiver.hour_price),
                "day_price": float(caregiver.day_price),
                "max_request_km": caregiver.max_request_km,
                "work_exp_years": caregiver.career_time,
                "additional_info": caregiver.additional_info,
                #"evaluations": [{"user": evaluation.user, "comment": evaluation.comment, "rating": evaluation.rating} for evaluation in caregiver.evaluations.all()],
                #"care_requests_dates": [str(request.date) for request in caregiver.carerequest.all()],

                "qualifications": [{
                    "name": qualification.name,
                    "conclusion_date": str(qualification.conclusion_date), 
                    "file": qualification.file
                } for qualification in caregiver.qualifications.all()],

                "work_exp": [{
                    "place": exp.place,
                    "description": exp.description, 
                    "start_date":str(exp.start_date),
                    "end_date": str(exp.end_date),
                } for exp in caregiver.work_exp.all()],

                "specializations": [specialization.get_name_display() for specialization in caregiver.specializations.all()],
                "fixed_unavailable_days": [day.day for day in caregiver.fixed_unavailable_days.all()],
                "fixed_unavailable_hours": [hour.hour for hour in caregiver.fixed_unavailable_hours.all()],
                "custom_unavailable_days": [str(day.day) for day in caregiver.custom_unavailable_days.all()],
            }
            caregiversData.append(caregiver_data)

    
        collection.insert_many(caregiversData)

        return Response(caregiversData, 200)
    
class CaregiverListView(generics.ListAPIView): #Não sei se essa url faz sentido já que vamos pegar do mongo, mas como não temos mongo ainda, ta ai.#
    queryset = Caregiver.objects.all()  #lembrando que tem que implementar filtro tbm {query_params} quando passar pro mongo.
    serializer_class = CaregiverSerializer
    permission_classes = (AllowAny,) #fixme precisa do user pra auth

class CaregiverEditView(APIView):
    queryset = Caregiver.objects.all()
    serializer_class = CaregiverSerializer
    permission_classes = (AllowAny,) #fixme precisa do user pra auth

    #como não temos a token ainda, não consigo direcionar pro usuario certo
    def put(self, request, format=None):
        caregiver = self.queryset.first()  #fixme

        serializer = CaregiverSerializer(caregiver, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, format=None):
        caregiver = self.queryset.first()  #fixme
        serializer = CaregiverSerializer(caregiver, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CaregiverSelfCalendarView(generics.RetrieveAPIView):
    queryset = Caregiver.objects.all()
    serializer_class = CaregiverSerializer
    permission_classes = (AllowAny,) #fixme precisa do user pra auth

    def retrieve(self, request, *args, **kwargs):
        instance = self.queryset.first() #fixme
        serializer = self.get_serializer(instance)

        calendar = {
           "fixed_unavailable_days":serializer.data.get('fixed_unavailable_days', []),
           "fixed_unavailable_hours":serializer.data.get('fixed_unavailable_hours', []),
           "custom_unavailable_days":serializer.data.get('custom_unavailable_days',[])
        }

        return Response(calendar)

class CaregiverDetailView(generics.RetrieveAPIView):
    queryset = Caregiver.objects.all()
    serializer_class = CaregiverSerializer
    permission_classes = (AllowAny,) #fixme precisa do user pra auth

class CaregiverCalendarView(generics.RetrieveAPIView):
    queryset = Caregiver.objects.all()
    serializer_class = CaregiverSerializer
    permission_classes = (AllowAny,)#fixme precisa do user pra auth
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        calendar = {
           "fixed_unavailable_days":serializer.data.get('fixed_unavailable_days', []),
           "fixed_unavailable_hours":serializer.data.get('fixed_unavailable_hours', []),
           "custom_unavailable_days":serializer.data.get('custom_unavailable_days',[])
        }

        return Response(calendar)

# Qualification (Odair)

class QualificationCreate(generics.CreateAPIView):
    queryset = Qualification.objects.all()
    serializer_class = QualificationSerializer
    permission_classes = (AllowAny,) #confirmar se precisa de auth 

class QualificationRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Qualification.objects.all()
    serializer_class = QualificationSerializer
    permission_classes = (AllowAny,)

##### Specialization - Leo #####
class SpecializationListCreateView(generics.ListCreateAPIView):
    queryset = Specialization.objects.all()
    serializer_class = SpecializationSerializer

class SpecializationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Specialization.objects.all()
    serializer_class = SpecializationSerializer

class SpecializationListView(generics.ListAPIView):
    queryset = Specialization.objects.all()
    serializer_class = SpecializationSerializer

class CarereceiverDetail(generics.RetrieveAPIView):
    carereceiver = Carereceiver.objects.all()
    queryset = Carereceiver.objects.all()
    serializer_class = CarereceiverSerializer

class CarereceiverEdit(APIView):
    queryset = Caregiver.objects.all()
    serializer_class = CarereceiverSerializer
    permission_classes = (AllowAny,)

    def put(self, request, format=None):
        carereceiver = self.queryset.first() 

        serializer = CarereceiverSerializer(carereceiver, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserSignup(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        serializer.save(authors=[self.request.user])

class UserLogin(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        else:
            return Response({'error': 'Usuário ou senha inválidos.'}, status=status.HTTP_400_BAD_REQUEST)

class UserLogout(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({'message': 'Logout ocorreu com sucesso.'})