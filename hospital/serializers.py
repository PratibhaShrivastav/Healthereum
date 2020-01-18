from rest_framework import serializers
from user.serializers import *


class AppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer()
    assigned_doctor = DoctorSerializer()

    class Meta:
        model = 'hospital.Appointment'
        fields = '__all__'

class StateSerializer(serializers.ModelSerializer):

    class Meta:
        model = 'hospital.State'
        fields = '__all__'

class CitySerializer(serializers.ModelSerializer):
    state = StateSerializer()

    class Meta:
        model = 'hospital.City'
        fields = '__all__'


class HospitalSerializer(serializers.ModelSerializer):

    class Meta:
        model = 'hospital.Hospital'
        fields = '__all__'
