from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Hospital, Medicine, Appointment
from user.models import Patient, Doctor
from . import serializers
from django.db.models import Q


class HospitalView(APIView):

	def post(self,request,format=None):
		search_text = request.data["search_text"]
		hospital = Hospital.objects.filter(Q(name__icontains = search_text) | Q(city__city__icontains = search_text))
		hospital = serializers.HospitalSerializer(hospital,many=True)

		return Response(hospital.data, status.HTTP_200_OK)

class Appointments(APIView):
    """
    Approving/Rejecting and Creating Appointments
    """

    def get(self, request, format=None):
        """
        Get List of all pending appointments
        """
        appointments = Appointment.objects.filter(reviewed=False)
        appointments = serializers.AppointmentSerializer(appointments, many=True)
        
        return Response(appointments.data, status.HTTP_200_OK)


    def patch(self, request, format=None):
        """
        Review appointments:
        1. Accept / Reject Requests
        2. Appoint Doctors
        3. Mark appointments as complete
        """

        if 'id' in request.data:
            object_id = request.data.pop('id')

        if 'status' in request.data:
            new_status = request.data.pop('status')

        if 'assigned_doctor' in request.data and new_status:
            doctor = Doctor.objects.get(id=request.data.pop('assigned_doctor'))
        else:
            doctor = None
        
        if 'completed' in request.data and new_status:
            complete = request.data.pop('completed')
        else:
            complete = False
        
        appointment = Appointment.objects.get(id=object_id)
        
        appointment.reviewed = True
        appointment.complete = complete
        appointment.assigned_doctor = doctor
        appointment.status = new_status
        appointment.save()
        appointment = serializers.AppointmentSerializer(appointment)
        
        return Response(appointment.data, status.HTTP_200_OK)


    def post(self, request, format=None):
        """
        Create appointments
        """

        if 'hospital' in request.data:
            hospital = request.data['hospital']
        else:
            return Response({'detail':'Hospital Name required.'},
                                 status.HTTP_400_BAD_REQUEST)

        if 'disease' in request.data:
            disease = request.data
        else:
            disease = 'N/A'
        
        hospital = Hospital.objects.get(id=hospital)

        try:
            appointment = Appointment.objects.create(patient=request.healthy_user, hospital=hospital, disease=disease)
        except:
            return Response({'detail':'There was some error creating appointment or the appointment already exists'},
                                 status.HTTP_503_SERVICE_UNAVAILABLE)
        
        appointment = serializers.AppointmentSerializer(appointment)
        
        return Response(appointment.data, status.HTTP_200_OK)
