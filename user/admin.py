from django.contrib import admin
from .models import Patient, Doctor,Specialization

admin.site.register(Patient)
admin.site.register(Doctor)
admin.site.register(Specialization)