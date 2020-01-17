from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Hospital, Medicine, Appointment
from . import serializers


class Appointments(APIView):
    """
    Approving/Rejecting and Creating Appointments
    """

    def get(self, request, format=None):
        appointments = Appointment.objects.all()
        appointments = serializers.AppointmentSerializer(appointments, many=True)
        return Response(appointments.data, status.HTTP_200_OK)

    def put(self, request, format=None):
        print(request.data['id'])
        appointment = Appointment.objects.get(id=request.data['id'])
        appointment = serializers.AppointmentSerializer(instance=appointment, data=request.data)
        return Response('No idea')