from rest_framework import serializers
from .models import Patient, Doctor
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']

class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Doctor
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Patient
        fields = '__all__'
