from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('appointments/', Appointments.as_view()),   
    path('',HospitalSearchView.as_view()),
]
