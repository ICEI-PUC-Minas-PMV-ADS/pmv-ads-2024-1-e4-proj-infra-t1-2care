import json
import pymongo
from pymongo import MongoClient
from caregiver.models import RatingModel

class MongoConnection(object):

    def __init__(self) -> None:
        cluster = MongoClient(#Quando colocar no vps, atualizar a key e não subir para o git.
            f"mongodb+srv://twocare:rb7NxWFV2fuAOzyBDRmpXbvmmuZvhYv7@2care.2cwas5l.mongodb.net/?retryWrites=true&w=majority&appName=2care"
        )
        db = cluster["2care"]
        collection = db["caregivers"]
        self.mongo_conn = collection

    def get_data_on_mongo(self, filter=None):
        # filter not implemented
        return list(self.mongo_conn.find({"hour_price": {"$gt": 0}}))

    def set_caregiver_data_on_mongo(self, caregiver_instance, update=False):
        try:
            caregiver_data = {
                "_id": str(caregiver_instance.id),
                "name": caregiver_instance.user.name,
                "picture": caregiver_instance.user.picture,
                "latitude": float(caregiver_instance.user.latitude),
                "longitude": float(caregiver_instance.user.longitude),
                "gender": caregiver_instance.user.gender,
                "preferred_contact": caregiver_instance.user.preferred_contact,
                "email": caregiver_instance.user.email,
                "phone": caregiver_instance.user.phone,
                "birth_date": str(caregiver_instance.user.birth_date),
                "date_joined": str(caregiver_instance.user.created_date),
                "hour_price": float(caregiver_instance.hour_price),
                "day_price": float(caregiver_instance.day_price) if caregiver_instance.day_price else None,
                "max_request_km": caregiver_instance.max_request_km,
                "career_time": caregiver_instance.career_time,
                "additional_info": caregiver_instance.additional_info,
                "evaluations": [
                    {
                        "id": str(rating.id),
                        "rating":rating.rating,
                        "description": rating.description,
                        "care_receiver": {"name": rating.care_request.carereceiver.user.name, "picture":rating.care_request.carereceiver.user.picture}
                    } 
                    for rating in RatingModel.objects.select_related('care_request__carereceiver').filter(care_request__caregiver=caregiver_instance)],
                "care_requests_dates": [],
                "qualifications": [
                    {
                        "name": qualification.name,
                        "conclusion_date": str(qualification.conclusion_date),
                        "file": qualification.file,
                    }
                    for qualification in caregiver_instance.qualifications.all()
                ],
                "work_exp": [
                    {
                        "place": exp.place,
                        "description": exp.description,
                        "start_date": str(exp.start_date),
                        "end_date": str(exp.end_date),
                    }
                    for exp in caregiver_instance.work_exp.all()
                ],
                "specializations": [
                    specialization.get_name_display()
                    for specialization in caregiver_instance.specializations.all()
                ],
                "fixed_unavailable_days": [
                    {"id":str(day.id), "day":day.day} for day in caregiver_instance.fixed_unavailable_days.all()
                ],
                "fixed_unavailable_hours": [
                    {"id":str(hour.id), "hour":hour.hour} for hour in caregiver_instance.fixed_unavailable_hours.all()
                ],
                "custom_unavailable_days": [
                    {"id":str(day.id), "day":str(day.day)} for day in caregiver_instance.custom_unavailable_days.all()
                ],
            }
            if update: #cabou que o upsert faz todo o trabalho e eu não precisava ter implementado esse sistema de update......
                self.mongo_conn.update_one({ "_id": str(caregiver_data['_id']) },{ "$set": caregiver_data }, upsert=True)
            else:
                self.mongo_conn.insert_one(caregiver_data)
            return True
        
        except Exception as e:
            print(e)
            return False
