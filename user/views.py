from django.shortcuts import render
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .models import Doctor,Patient
from hospital.models import Hospital
from . import serializers
from hospital.serializers import HospitalSerializer


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

				userData = serializers.UserSerializer(user)
				tokenData = serializers.TokenSerializer(token)

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
		tokenData = serializers.TokenSerializer(token)

		return Response(tokenData.data)

class DoctorRegisterView(APIView):
	
	def post(self, request, format=None):
		contact = request.data.get("contact", None)
		profile_pic = request.data.get("profile_pic", None)
		age = request.data("age", None)
		gender = request.data("gender", None)
		email = request.data.get("email", None)
		unique_id = request.data("unique_id",None)
		address = request.data("address", None)
		pincode = request.data("pincode", None)
		city = request.data("city", None)
		skill_data = request.data.get("skill", None)
		hospital_id = request.data("hospital_id", None)

		hospital_obj = Hospital.objects.get(id=hospital_id)
		city_obj = City.objects.get(city=city)

		doctor = Doctor.objects.create(user = request.healthy_user, contact = contact, profile_pic = profile_pic,
										age = age, gender =  gender, email = email, unique_id = unique_id,
										address = address, pincode = pincode, city = city_obj, hospital = hospital_obj)
		
		skills = []
		for skill in skill_data:
			skill_obj = Specialization.objects.create_or_get(field_name=skill)
			doctor.skill.add(skill_obj)
		doctor.save()

		return Response(doctor)


class PatientRegisterView(APIView):

	def post(self, request, format=None):
		contact = request.data["contact"]
		age = request.data["age"]
		address = request.data["address"]
		pincode = request.data["pincode"]
		city = request.data["city"]
		unique_id = request.data["unique_id"]

		city_obj = City.objects.get(city=city)

		patient = Patient.objects.create(user = request.healthy_user, contact = contact, age = age,
										address = address, pincode = pincode, city = city_obj,
										unique_id = unique_id) 






