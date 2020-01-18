from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from user.models import Patient, Doctor
from . import serializers
from django.db.models import Q


class HospitalSearchView(APIView):

	def post(self,request,format=None):
		search_text = request.data["search_text"]
		hospital = Hospital.objects.filter(Q(name__icontains = search_text) | Q(city__city__icontains = search_text))
		hospital = serializers.HospitalSerializer(hospital,many=True)

		return Response(hospital.data, status.HTTP_200_OK)

# class HospitalView(APIView):

#     def post(self, request, format=None):
        
#         unique_id = request.data.get("unique_id")
#         user = request.healthy_user
#         bio = request.data.get("bio", None)
#         email = request.data.get("email", None)
#         contact = request.data.get("contact")
#         fax_number = request.data.get("fax_number", None)
#         address = request.data.get("address")
#         pincode = request.data.get("pincode")
#         website = request.data.get("website", None)
#         city = request.data.get("city")
        
#         city_obj = City.objects.get(city=city)

#         hospital = Hospital.objects.create(unique_id=unique_id, user=user, bio=bio, email=email, contact=contact,
#                 fax_number=fax_number, address=address, pincode=pincode, website=website, city=city_obj)
        
#         hospital = HospitalSerializer(hospital)


#         return Response(hospital.data)

#     def get(self, request, format=None):

#         hospital = Hospital.objects.get(id=1)
#         # hospital = request.healthy_user.hospital
#         print(hospital)
#         # print("\n\n\n\n\n")
#         hospital = HospitalSerializer(hospital)
#         print(hospital)
        
#         return Response("Done")


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
