from rest_framework import serializers
from .models import *
from user.serializers import *
from user.models import *


class AppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer()
    assigned_doctor = DoctorSerializer()

    class Meta:
        model = Appointment
        fields = '__all__'

    def create(self, validated_data):
        print("In Create    ")
        patient_id = validated_data.pop('patient')
        patient = Patient.objects.get(id=patient_id) 
        appointment = Appointment.objects.create(patient = patient, **validated_data)
        return appointment

    def update(self, instance, validated_data):
        print("In Update\n\n")
        new_status = validated_data.pop('status')
        doctor_id = validated_data.pop('assigned_doctor')
        print(new_status)
        print(doctor_id)
        if new_status:
            doctor = Doctor.objects.get(id=doctor) 
            instance.assigned_doctor = doctor
            instance.status = new_status
            instance.save()
        else:
            instance.status = new_status
            instance.doctor = None
            instance.save()
        return instance

class StateSerializer(serializers.ModelSerializer):

    class Meta:
        model = State
        fields = '__all__'

class CitySerializer(serializers.ModelSerializer):
    state = StateSerializer()

    class Meta:
        model = City
        fields = '__all__'


class HospitalSerializer(serializers.ModelSerializer):
    city  = CitySerializer()

    class Meta:
        model = Hospital
        fields = '__all__'
