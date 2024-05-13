from django.db import transaction
from django.shortcuts import get_object_or_404
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

from user.models import (
    CustomUserModel
)

class CareReceiverDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = CareReceiverSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return None

    def get_object(self):
        return get_object_or_404(CareReceiverModel, user=self.request.user)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
    
class CareReceiverCreateView(generics.CreateAPIView):
    serializer_class = CareReceiverSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        careReceiver = CareReceiverModel.objects.filter(user=request.user).first()
        request.data["user"] = request.user.id

        if not request.user.get_user_type_display() == "CareReceiver":
            return Response("This user is not a Care Receiver", status=status.HTTP_400_BAD_REQUEST)
        
        if careReceiver:
            serializer = CareReceiverSerializer(careReceiver, data=request.data)
        else:
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
    model = SpecialCareUserModel
    serializer_class = SpecialCareUserSerializer
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = get_object_or_404(CustomUserModel, id=self.request.user.id)

        if not user.get_user_type_display() == "CareReceiver":
            return Response("This user is not a Care Receiver", status=status.HTTP_400_BAD_REQUEST)
        
        careReceiver = get_object_or_404(CareReceiverModel, user=user)

        if careReceiver:
            return Response({"status": "success", "specialCare":  self.serializer_class(SpecialCareUserModel.objects.filter(care_receiver=careReceiver).all(), many=True).data}, status=200)

        return self.model.objects.none()
    
    def post(self, request, *args, **kwargs):
        data = request.data
        user = get_object_or_404(CustomUserModel, id=self.request.user.id)

        if not user.get_user_type_display() == "CareReceiver":
            return Response("This user is not a Care Receiver", status=status.HTTP_400_BAD_REQUEST)
        
        careReceiver = get_object_or_404(CareReceiverModel, user=user)
        specialCare, created = SpecialCareModel.objects.get_or_create(name=data["care_type"])

        if specialCare:
            data["care_type"] = specialCare.id
            data["care_receiver"] = careReceiver.id
            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print(serializer.errors)
                return Response("Something went wrong.", status=status.HTTP_500_INTERNAL_SERVER_ERROR)  
        else:
            return Response("Erro ao criar cuidado especial", status=status.HTTP_500_INTERNAL_SERVER_ERROR)  

class SpecialCareUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SpecialCareUserModel.objects.all()
    model = SpecialCareUserModel
    serializer_class = SpecialCareUserSerializer
    authentication_classes = [JWTAuthentication]
    
    def delete(self, request, pk):
        user = get_object_or_404(CustomUserModel, id=self.request.user.id)

        if not user.get_user_type_display() == "CareReceiver":
            return Response("This user is not a Care Receiver", status=status.HTTP_400_BAD_REQUEST)
      
        if(pk):
            careReceiver = get_object_or_404(CareReceiverModel, user=user)
            specialCare = self.model.objects.filter(id=pk, care_receiver=careReceiver)
            if specialCare.count() == 1:
                specialCare.delete()
                return Response({"status": "success", "specialCare": pk}, status=200)
            else:
                return Response("Cuidado especial não encontrada", status=status.HTTP_404_NOT_FOUND)  
        else:
            return Response("Something went wrong.", status=status.HTTP_500_INTERNAL_SERVER_ERROR)