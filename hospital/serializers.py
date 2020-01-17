from rest_framework import serializers
from .models import Appointment
from user.serializers import *


class AppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer()
    assigned_doctor = DoctorSerializer()

    class Meta:
        model = Appointment
        fields = '__all__'

    def create(self, validated_data):
        print("In Create")
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
