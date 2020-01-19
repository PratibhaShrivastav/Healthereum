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
import datetime
from utils import add_data_block, show_data


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

	def get(self, request, format=None):
		"""
		Returns Doctor's profile
		"""
		user = request.healthy_user
		doctor = user_models.Doctor.objects.get(user=user)
		doctor = user_serializers.DoctorSerializer(doctor)

		return Response(doctor.data)


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
		
		patient = user_models.Patient.objects.create(user = request.healthy_user, contact = contact, age = age,
										address = address, pincode = pincode, city = city_obj,
										unique_id = unique_id) 

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

class PatientView(APIView):

	def get(self, request, format=None):
		"""
		Get all appointments of a patient
		"""
		user = request.healthy_user
		patient = user_models.Patient.objects.get(user=user)
		pending_appointments = hospital_models.Appointment.objects.filter(patient=patient, complete=True)
		completed_appointments = hospital_models.Appointment.objects.filter(patient=patient, complete=False)
		
		pending_appointments = hospital_serializers.AppointmentSerializer(pending_appointments, many=True)
		completed_appointments = hospital_serializers.AppointmentSerializer(completed_appointments, many=True)

		return Response({
			"pending":pending_appointments.data,
			"completed":completed_appointments.data
			})


class RecordView(APIView):
	
	def get(self, request, format=None):

		patient_id = request.data.get("patient_id")
		patient = user_models.Patient.objects.get(id=patient_id)
		blocks = user_models.Block.objects.filter(patient=patient)

		res = []

		for block in blocks:
			res.append(show_data(block.id))

		return Response(res)

	def post(self, request, format=None):

		patient_id = request.data.get("patient_id")
		appointment_id = request.data.get("appointment_id")
		medicines = request.data.get("medicines")
		appointment = hospital_models.Appointment.objects.get(id=appointment_id)
		patient = user_models.Patient.objects.get(id=patient_id)
		doctor = user_models.Doctor.objects.get(user=request.healthy_user)
		hospital = doctor.hospital
		now=datetime.datetime.now()
		date = now.strftime("%Y-%m-%d")

		skills_data = doctor.skills.all()
		skills = ""
		for skill in skills_data:
			skills += skill.field_name
			skills += ","

		data = {
			"hospital_name":hospital.name,
			"doc_name":doctor.user.first_name+' '+doctor.user.last_name,
			"doc_skill":skills,
			"address":hospital.address,
			"date":date,
			"patient_name":patient.user.first_name+' '+patient.user.last_name,
			"age":str(patient.age),
			"gender":patient.gender,
			"disease":appointment.disease,
			"medicines":medicines
		}
		
		data = add_data_block(data)
	
		data = {
			"block_id":data[10],
			"hospital_name":data[0],
			"doc_name":data[1],
			"doc_skill":data[2],
			"address":data[3],
			"date":data[4],
			"patient_name":data[5],
			"age":data[6],
			"gender":data[7],
			"disease":data[8],
			"medicines":data[9]
		}

		block = user_models.Block.objects.create(number=data["block_id"],patient=patient)

		return Response(data)