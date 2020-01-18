from django.shortcuts import render
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from . import models as user_models
from hospital import models as hospital_models
from .serializers import *
from hospital import serializers as hospital_serializers
from user import serializers as user_serializers


class RegisterView(APIView):

	def post(self, request, format=None):
		username = request.data["username"]
		first_name = request.data["first_name"]
		last_name = request.data["last_name"]
		password = request.data["password"]
		cpassword = request.data["cpassword"]

		if password == cpassword:
			try:
				user = User.objects.create(username=username, first_name=first_name,
											last_name=last_name)
				
				user.set_password(password)
				user.save()

				token, created = Token.objects.get_or_create(user=user)

				userData = UserSerializer(user)
				tokenData = TokenSerializer(token)

				return Response({"user":userData.data,"token":tokenData.data}, status=status.HTTP_200_OK)
			except:
				return Response({"detail":"Error creating user."})	
		else:
			return Response({"detail":"Passwords don't match."})

		

class LoginView(APIView):
	"""
	Login with token auth
	"""

	def post(self, request, format=None):
		username = request.data["username"]
		password = request.data["password"]

		user = authenticate(username=username,password=password)

		token, created = Token.objects.get_or_create(user=user)

		if hospital_models.Hospital.objects.filter(user=user).count()>0:
			user_type = 'hospital'
		elif user_models.Patient.objects.filter(user=user).count()>0:
			user_type = 'patient'
		elif user_models.Doctor.objects.filter(user=user).count()>0:
			user_type = 'doctor'
		else:
			user_type = 'ERROR'
		
		tokenData = TokenSerializer(token)

		return Response({'user_type':user_type,'token':tokenData.data})

class DoctorRegisterView(APIView):
	
	def post(self, request, format=None):
		#User Details 
		username = request.data.get("username")
		first_name = request.data.get("first_name")
		last_name = request.data.get("last_name")
		password = request.data.get("password")

		#Doctor Profile Details
		contact = request.data.get("contact", None)
		profile_pic = request.data.get("profile_pic", None)
		age = request.data.get("age", None)
		gender = request.data.get("gender", None)
		email = request.data.get("email", None)
		unique_id = request.data.get("unique_id",None)
		address = request.data.get("address", None)
		pincode = request.data.get("pincode", None)
		city = request.data.get("city", None)
		state = request.data.get("state", None)
		skill_data = request.data.get("skill", None)
		
		#Creating User 
		try:
			user = User.objects.create(username=username, first_name=first_name,
					last_name = last_name)
			user.set_password(password)
			user.save()
		except:
			return Response("Error Creating User!")

		#Creating Doctor Profile
		hospital_obj = hospital_models.Hospital.objects.get(user=request.healthy_user)
		
		state_obj, created = hospital_models.State.objects.get_or_create(state=state)
		city_obj, created = hospital_models.City.objects.get_or_create(city=city, state=state_obj)

		# try:
		doctor = user_models.Doctor.objects.create(user = user, contact = contact,age = age, gender =  gender,
				 email = email, unique_id = unique_id, address = address, pincode = pincode, city = city_obj, hospital = hospital_obj)
		# except:
		# 	return Response("Error creating profile")

		skills = []
		for skill in skill_data:
			skill_obj, created = user_models.Specialization.objects.get_or_create(field_name=skill)
			doctor.skills.add(skill_obj.id)
		doctor.save()

		doctor = user_serializers.DoctorSerializer(doctor)
		token, created = Token.objects.get_or_create(user=user)
		token = user_serializers.TokenSerializer(token)

		return Response({
			'token':token.data,
			'doctor':doctor.data
		}, status=status.HTTP_200_OK)


class PatientRegisterView(APIView):

	def post(self, request, format=None):
		contact = request.data.get("contact",None)
		age = request.data.get("age",None)
		address = request.data.get("address")
		pincode = request.data.get("pincode")
		city = request.data.get("city")
		state = request.data.get("state")
		unique_id = request.data.get("unique_id")

		try:
			city_obj = hospital_models.City.objects.get(city=city)
		except:
			state_obj = hospital_models.State.objects.create(state=state)
			city_obj = hospital_models.City.objects.create(city=city, state=state_obj)
		
		try:
			patient = user_models.Patient.objects.create(user = request.healthy_user, contact = contact, age = age,
											address = address, pincode = pincode, city = city_obj,
											unique_id = unique_id) 
		except:
			return Response("Error creating your profile!")

		token = Token.objects.get(user=request.healthy_user)
		token = TokenSerializer(token)

		patient = user_serializers.PatientSerializer(patient)

		return Response({"token":token.data,"details":patient.data})

class DoctorView(APIView):

	def get(self, request, format=None):
		user = request.healthy_user
		hospital = hospital_models.Hospital.objects.get(user=user)
		doctors = user_models.Doctor.objects.filter(hospital=hospital)
		doctor_details = user_serializers.DoctorSerializer(doctors, many=True)
		# appointments = user.doctor.my_appointments.all()
		# appointments = hospital_serializers.AppointmentSerializer(appointments, many=True)
		return Response(doctor_details.data, status.HTTP_200_OK)



