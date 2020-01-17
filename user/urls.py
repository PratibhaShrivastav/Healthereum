from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('doctor/create_profile', DoctorRegisterView.as_view()),
    path('patient/create_profile', PatientRegisterView.as_view()),
]
