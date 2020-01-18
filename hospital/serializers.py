from rest_framework import serializers
from user import serializers as user_serializers
from . import models as hospital_models

class AppointmentSerializer(serializers.ModelSerializer):
    patient = user_serializers.PatientSerializer()
    # assigned_doctor = user_serializers.DoctorSerializer()

    class Meta:
        model = hospital_models.Appointment
        exclude = ('assigned_doctor', )
        depth = 2

class StateSerializer(serializers.ModelSerializer):

    class Meta:
        model = hospital_models.State
        fields = '__all__'

class CitySerializer(serializers.ModelSerializer):
    state = StateSerializer()

    class Meta:
        model = hospital_models.City
        fields = '__all__'


class HospitalSerializer(serializers.ModelSerializer):

    class Meta:
        model = hospital_models.Hospital
        fields = '__all__'

