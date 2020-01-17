from django.shortcuts import render
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .models import Doctor,Patient

class RegisterView(APIView):

	def post(self, request, format=None):
		username = request.data["username"]
		first_name = request.data["first_name"]
		last_name = request.data["last_name"]
		password = request.data["password"]
		cpassword = request.data["cpassword"]

		if password == cpassword:
			user = User.objects.create(username=username, first_name=first_name
										last_name=last_name, password=password)

		else:
			return Response({"detail":"Passwords don't match"})

		

class LoginView(APIView):
    """
    Login with token auth
    """

    def post(self, request, format=None):
		username = request.data["username"]
		password = request.data["password"]

		user = authenticate(username=username,password=password)

		token = Token.objects.get_or_create(user=user)
		return Response(token)

class DoctorRegisterView(APIView):
	
	def post(self, request, format=None):
		contact = request.data["contact"]
		profile_pic = request.data.get("profile_pic", None)
		age = request.data["age"]
		gender = request.data["gender"]
		email = request.data.get("email", None)
		unique_id = request.data["unique_id"]
		address = request.data["address"]
		pincode = request.data["pincode"]
		city = request.data["city"]
		skill = request.data.get("skill", None)
		hospital = request.data["hospital"]

		doctor = Doctor.objects.create(user = request.user, contact = contact, profile_pic = profile_pic
										, age = age,gender =  gender, email = email, unique_id = unique_id,
										address = address, pincode = pincode, city = city,
										skill = skill, hospital = hospital)

class PatientRegisterView(APIView):

	def post(self, request, format=None):
		contact = request.data["contact"]
		age = request.data["age"]
		address = request.data["address"]
		pincode = request.data["pincode"]
		city = request.data["city"]
		unique_id = request.data["unique_id"]

		patient = Patient.objects.create(user = request.user, contact = contact, age = age,
										address = address, pincode = pincode, city = city,
										unique_id = unique_id) 




