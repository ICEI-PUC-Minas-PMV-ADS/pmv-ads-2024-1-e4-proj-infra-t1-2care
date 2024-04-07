from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import (
    CareRequestModel,
    CareReceiverModel,
    CaregiverModel,
    RatingModel,
    SpecialCareModel,
    SpecialCareUserModel,
    SpecializationModel,
    QualificationModel,
)

from .serializers import (
    CareRequestSerializer,
    CareReceiverSerializer,
    CaregiverSerializer,
    QualificationSerializer,
    RatingSerializer,
    SpecialCareSerializer,
    SpecialCareUserSerializer,
    SpecializationSerializer,
    UserSerializer,
)
import pymongo
from pymongo import MongoClient

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

        caregivers = CaregiverModel.objects.prefetch_related("qualifications", "work_exp", "specializations", "fixed_unavailable_days", "fixed_unavailable_hours", "custom_unavailable_days").all()
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
    queryset = Caregiver.objects.all()
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


class CareReceiverDetailView(generics.RetrieveUpdateAPIView):
    """
    Retrieve, update ou partially update um CareReceiver.
    """

    serializer_class = CareReceiverSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Este view deverá retornar o CareReceiver relacionado ao usuário que fez a requisição
        """
        user = self.request.user
        return CareReceiverModel.objects.filter(user=user)

    def get_object(self):
        """
        Retorna o objeto do CareReceiver relacionado ao usuário.
        Se o CareReceiver não existir, retorna NotFound.
        """
        queryset = self.get_queryset()
        obj = generics.get_object_or_404(queryset)
        self.check_object_permissions(self.request, obj)
        return obj

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class CareReceiverCreateView(generics.CreateAPIView):
    """
    Cria um novo CareReceiver.
    """

    serializer_class = CareReceiverSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Cria um novo CareReceiver associado ao usuário que fez a requisição.
        """
        serializer.save(user=self.request.user)


# Supondo que você queira ter uma view para listar todos os CareReceivers
# Esta view deverá ser protegida e restrita a apenas admins ou pessoal autorizado.
# class CareReceiverListView(generics.ListAPIView):
#     """
#     Listar todos os CareReceivers. Deve ser acessível apenas por admins.
#     """
#     serializer_class = CareReceiverSerializer
#     permission_classes = [IsAuthenticated]  # Altere para uma permissão mais específica de admin

#     def get_queryset(self):
#         """
#         Este view deverá retornar uma lista de todos os CareReceivers.
#         Pode ser filtrada para retornar apenas CareReceivers específicos.
#         """
#         return CareReceiver.objects.all()


class UserSignupView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer


class UserLoginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer


class UserLogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


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


class SpecialCareListView(generics.ListCreateAPIView):
    queryset = SpecialCareModel.objects.all()
    serializer_class = SpecialCareSerializer


class SpecialCareDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SpecialCareModel.objects.all()
    serializer_class = SpecialCareSerializer
    authentication_classes = [JWTAuthentication]


class SpecialCareUserListView(generics.ListCreateAPIView):
    queryset = SpecialCareUserModel.objects.all()
    serializer_class = SpecialCareUserSerializer


class SpecialCareUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SpecialCareUserModel.objects.all()
    serializer_class = SpecialCareUserSerializer
    authentication_classes = [JWTAuthentication]
