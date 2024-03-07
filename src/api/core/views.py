from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Greeting
from .serializers import GreetingSerializer

class GreetingList(APIView):
    def get(self, request):
        greetings = Greeting.objects.all()
        serializer = GreetingSerializer(greetings, many=True)
        return Response(serializer.data)
