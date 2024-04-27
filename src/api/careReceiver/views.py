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
    serializer_class = SpecialCareUserSerializer


class SpecialCareUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SpecialCareUserModel.objects.all()
    serializer_class = SpecialCareUserSerializer
    authentication_classes = [JWTAuthentication]
