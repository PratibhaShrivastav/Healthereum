from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']

class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = '__all__'

class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = 'user.Doctor'
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = 'user.Patient'
        fields = '__all__'
