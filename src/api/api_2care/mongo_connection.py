import json
import pymongo
from pymongo import MongoClient


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
        return list(self.mongo_conn.find({}))

    def set_caregiver_data_on_mongo(self, caregiver_instance, update=False):
        try:
            caregiver_data = {
                "_id": str(caregiver_instance.id),
                "name": caregiver_instance.user.name,
                "picture": caregiver_instance.user.picture,
                "latitude": float(caregiver_instance.user.latitude),
                "longitude": float(caregiver_instance.user.longitude),
                "gender": caregiver_instance.user.gender,
                "birth_date": caregiver_instance.user.birth_date,
                "hour_price": float(caregiver_instance.hour_price),
                "day_price": float(caregiver_instance.day_price) if caregiver_instance.day_price else None,
                "max_request_km": caregiver_instance.max_request_km,
                "work_exp_years": caregiver_instance.career_time,
                "additional_info": caregiver_instance.additional_info,
                # "evaluations": [{"user": evaluation.user, "comment": evaluation.comment, "rating": evaluation.rating} for evaluation in caregiver.evaluations.all()],
                # "care_requests_dates": [str(request.date) for request in caregiver.carerequest.all()],
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
                    day.day for day in caregiver_instance.fixed_unavailable_days.all()
                ],
                "fixed_unavailable_hours": [
                    hour.hour for hour in caregiver_instance.fixed_unavailable_hours.all()
                ],
                "custom_unavailable_days": [
                    str(day.day) for day in caregiver_instance.custom_unavailable_days.all()
                ],
            }
            if update:
                self.mongo_conn.update_one({ "_id": str(caregiver_data['_id']) },{ "$set": caregiver_data })
            else:
                self.mongo_conn.insert_one(caregiver_data)
            return True
        
        except Exception as e:
            print(e)
            return False
