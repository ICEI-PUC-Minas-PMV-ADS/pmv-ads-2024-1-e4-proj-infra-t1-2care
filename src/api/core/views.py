from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from caregiver.models import (CaregiverModel,)
import json

import pymongo
from pymongo import MongoClient
import requests

class GetGeoLocation(APIView):
    permission_classes = (AllowAny,) 
    def get(self, request, *args, **kwargs):
        response = requests.get(f'https://maps.googleapis.com/maps/api/geocode/json?address={kwargs["post_code"]}$&key=AIzaSyDcP7z-K5Dyc9xxVOeyUyNfb4QyBwjcIsQ')
        if response.status_code == 200:
            # Convert the response to JSON format
            data = response.json()
            # Now data contains the response data in JSON format
            return Response(data, 200)
        else:
           Response(500)

class AddSpecialization(APIView):
    permission_classes = (AllowAny)

    def post(self, request, *args, **kwargs):
        data = request.data
        especializacao = data.get('especializacao')
        if not especializacao:
            return Response({"error": "Especialização não fornecida"}, status=400)
        
        # new_specialization = CaregiverModel(especializacao=especializacao)
        # new_specialization.save()

        return Response({"status": "success", "especializacao": especializacao}, status=200)

#deixei aqui de ref caso eu precise..
""" class MongoUpdate(APIView):
    #temos que ver tudo que vai ser necessario ainda. por hora vou só salvar todos os caregivers no mongo, mas depois precisamos fazer updates ao alterar caregiver e create ao criar usuario
    #ou colocar algum scheduler pra re atualizar tudo de tempos em tempos
    #vou deixar na nuvem por hora até de fato colocarmos na VPS, se não fica ruim do pessoal trabalhar.
    permission_classes = (AllowAny,) 
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

        return Response(caregiversData, 200) """