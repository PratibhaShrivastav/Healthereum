from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models as hospital_models
from . import serializers as hospital_serializers
from user import serializers as user_serializers
from user import models as user_models
from django.db.models import Q
import pdb


class PatientSearchView(APIView):

    def post(self, request, format=None):
        """
        Search Results of emergency users
        """
        hospital = hospital_models.Hospital.objects.filter(user=request.healthy_user)
        
        if hospital.count()>0:
            search_text = request.data["unique_id"]
            patient = user_models.Patient.objects.filter(unique_id=search_text)
            
            if patient.count() == 0:
                return Response("No users with this id")
        
            patient = user_serializers.PatientSerializer(patient[0])
            return Response(patient.data)
        else:
            return Response("Not Authorized to perform this action.")


class HospitalSearchView(APIView):
	
    def post(self,request,format=None):
        """
        Search Results of hospital/city
        """
        search_text = request.data["search_text"]
        hospital = hospital_models.Hospital.objects.filter(Q(name__icontains = search_text) | Q(city__city__icontains = search_text))
        hospital = hospital_serializers.HospitalSerializer(hospital,many=True)

        return Response(hospital.data, status.HTTP_200_OK)


class HospitalView(APIView):

    def post(self, request, format=None):
        
        unique_id = request.data.get("unique_id")
        user = request.healthy_user
        name = request.data.get("name")
        bio = request.data.get("bio", None)
        email = request.data.get("email", None)
        contact = request.data.get("contact")
        fax_number = request.data.get("fax_number", None)
        address = request.data.get("address")
        pincode = request.data.get("pincode")
        website = request.data.get("website", None)
        city = request.data.get("city")
        state = request.data.get("state")

        state, created = hospital_models.State.objects.get_or_create(state=state)
        city_obj, created = hospital_models.City.objects.get_or_create(city=city, state=state)

        hospital = hospital_models.Hospital.objects.create(unique_id=unique_id, name=name, user=user, bio=bio, email=email, contact=contact,
                fax_number=fax_number, address=address, pincode=pincode, website=website, city=city_obj)
        
        hospital = hospital_serializers.HospitalSerializer(hospital)

        return Response(hospital.data)

    def get(self, request, format=None):

        hospital = hospital_models.Hospital.objects.get(user=request.healthy_user)
        hospital = hospital_serializers.HospitalSerializer(hospital)
        
        return Response(hospital.data)


class Appointments(APIView):
    """
    Approving/Rejecting and Creating Appointments
    """
    def post(self, request, format=None):
        user = request.healthy_user
        patient = user_models.Patient.objects.get(user=user)
        disease = request.data.get("disease", None)
        hospital_id = request.data.get("hospital_id")
        hospital = hospital_models.Hospital.objects.get(id=hospital_id)

        appointment = hospital_models.Appointment.objects.create(patient=patient, disease=disease,
                    hospital=hospital)
        appointment = hospital_serializers.AppointmentSerializer(appointment)

        return Response(appointment.data)


    def get(self, request, format=None):
        """
        Get List of all pending appointments
        """
        hospital = hospital_models.Hospital.objects.get(user=request.healthy_user)

        completed_appointments = hospital_models.Appointment.objects.filter(hospital=hospital, complete=True)
        not_reviewed_appointments = hospital_models.Appointment.objects.filter(hospital=hospital, reviewed=False)
        
        completed_appointments = hospital_serializers.AppointmentSerializer(completed_appointments, many=True)
        not_reviewed_appointments = hospital_serializers.AppointmentSerializer(not_reviewed_appointments, many=True)
        
        return Response({
            "pending":not_reviewed_appointments.data,
            "completed":completed_appointments.data
        }, status.HTTP_200_OK)


    def patch(self, request, format=None):
        """
        Review appointments:
        1. Accept / Reject Requests
        2. Appoint Doctors
        3. Mark appointments as complete
        """

        if 'id' in request.data:
            object_id = request.data.pop('id')
        else:
            return Response("Please mention the appointment ID")
        
        if 'status' in request.data:
            new_status = request.data.pop('status')
        else:
            return Response("No status change detected!")

        if 'assigned_doctor' in request.data and new_status:
            doctor = user_models.Doctor.objects.get(id=request.data.pop('assigned_doctor'))
        else:
            if new_status:
                return Response("Please select a doctor!")
            else:
                doctor = None
        
        if 'completed' in request.data and new_status:
            complete = request.data.pop('completed')
        else:
            complete = False
        
        appointment = hospital_models.Appointment.objects.get(id=object_id)
        
        appointment.reviewed = True
        appointment.complete = complete
        appointment.assigned_doctor = doctor
        appointment.status = new_status
        appointment.save()
        appointment = hospital_serializers.AppointmentSerializer(appointment)
        
        return Response(appointment.data, status.HTTP_200_OK)
