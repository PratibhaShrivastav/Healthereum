from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('doctor/create_profile', DoctorRegisterView.as_view()),
    path('patient/create_profile', PatientRegisterView.as_view()),
    path('doctor',DoctorView.as_view()),
    path('record',RecordView.as_view()),
    # path('patient',PatientView.as_view()),
    # path('add_record/',AddMedicalRecordView.as_view()),
]
