from django.db import transaction
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


from .models import (
    CareReceiverModel,
    SpecialCareModel,
    SpecialCareUserModel,
)

from .serializers import (
    CareReceiverSerializer,
    SpecialCareSerializer,
    SpecialCareUserSerializer,
)

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
    serializer_class = CareReceiverSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        careReceiver = CareReceiverModel.objects.filter(user=request.user).first()
        
        if careReceiver:
            serializer = CareReceiverSerializer(careReceiver, data=request.data)
        else:
            if not request.user.get_user_type_display() == "CareReceiver":
                return Response("This user is not a Care Receiver", status=status.HTTP_400_BAD_REQUEST)

            serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            with transaction.atomic():
                careReceiver_instance = serializer.save()
                careReceiver_instance.user = request.user
                careReceiver_instance.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED if not careReceiver else status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
