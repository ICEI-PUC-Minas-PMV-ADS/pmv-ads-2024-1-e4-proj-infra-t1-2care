from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CareRequest, CareReceiver, Caregiver, Rating, Specialization, Qualification
from .serializers import CareRequestSerializer, CareReceiverSerializer, CaregiverSerializer, QualificationSerializer, RatingSerializer, SpecializationSerializer, UserSerializer


class CaregiverList(generics.ListAPIView): #Não sei se essa url faz sentido já que vamos pegar do mongo, mas como não temos mongo ainda, ta ai.
    queryset = Caregiver.objects.all()  #lembrando que tem que implementar filtro tbm {query_params} quando passar pro mongo.
    serializer_class = CaregiverSerializer
    permission_classes = (AllowAny,) #fixme precisa do user pra auth
    # authentication_classes =[JWTAuthentication]

class CaregiverEdit(APIView):
    queryset = Caregiver.objects.all()
    serializer_class = CaregiverSerializer
    permission_classes = (AllowAny,) #fixme precisa do user pra auth
    authentication_classes =[JWTAuthentication]
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
    authentication_classes =[JWTAuthentication]
    def retrieve(self, request, *args, **kwargs):
        instance = self.queryset.first() #fixme
        serializer = self.get_serializer(instance)

        calendar = {
           "fixed_unavailable_days":serializer.data.get('fixed_unavailable_days', []),
           "fixed_unavailable_hours":serializer.data.get('fixed_unavailable_hours', []),
           "custom_unavailable_days":serializer.data.get('custom_unavailable_days',[])
        }

        return Response(calendar)

class CaregiverDetail(generics.RetrieveAPIView):
    queryset = Caregiver.objects.all()
    serializer_class = CaregiverSerializer
    permission_classes = (AllowAny,) #fixme precisa do user pra auth
    # authentication_classes =[JWTAuthentication]
class CaregiverCalendarView(generics.RetrieveAPIView):
    queryset = Caregiver.objects.all()
    serializer_class = CaregiverSerializer
    permission_classes = (AllowAny,)#fixme precisa do user pra auth
    authentication_classes =[JWTAuthentication]
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        calendar = {
           "fixed_unavailable_days":serializer.data.get('fixed_unavailable_days', []),
           "fixed_unavailable_hours":serializer.data.get('fixed_unavailable_hours', []),
           "custom_unavailable_days":serializer.data.get('custom_unavailable_days',[])
        }

        return Response(calendar)
    
#Qualification (Odair)

class QualificationCreate(generics.CreateAPIView):
    queryset = Qualification.objects.all()
    serializer_class = QualificationSerializer
    authentication_classes =[JWTAuthentication]
class QualificationRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Qualification.objects.all()
    serializer_class = QualificationSerializer
    authentication_classes =[JWTAuthentication]
##### Specialization - Leo #####
class SpecializationListCreateView(generics.ListCreateAPIView):
    queryset = Specialization.objects.all()
    serializer_class = SpecializationSerializer
    authentication_classes =[JWTAuthentication]
class SpecializationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Specialization.objects.all()
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
        return CareReceiver.objects.filter(user=user)

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

class UserSignup(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

class LoginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class CareRequestListCreate(generics.ListCreateAPIView):
    authentication_classes =[JWTAuthentication]
    queryset = CareRequest.objects.all()
    serializer_class = CareRequestSerializer

class CareRequestDetail(generics.RetrieveAPIView):
    authentication_classes =[JWTAuthentication]
    queryset = CareRequest.objects.all()
    serializer_class = CareRequestSerializer

class CareRequestAccept(APIView):
    authentication_classes =[JWTAuthentication]
    def post(self, request, pk):
        care_request = CareRequest.objects.get(pk=pk)
        care_request.status = 2 # Autorizado
        care_request.save()
        return Response({'status': 'accepted'}, status=status.HTTP_200_OK)

class CareRequestDecline(APIView):
    authentication_classes =[JWTAuthentication]
    def post(self, request, pk):
        care_request = CareRequest.objects.get(pk=pk)
        care_request.status = 1  # Recusado
        care_request.save()
        return Response({'status': 'declined'}, status=status.HTTP_200_OK)

class RatingCreate(generics.CreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    authentication_classes =[JWTAuthentication]

class RatingDetail(generics.RetrieveAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    authentication_classes =[JWTAuthentication]