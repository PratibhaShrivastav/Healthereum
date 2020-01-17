from django.contrib import admin
from .models import Hospital, City, State, Medicine, Appointment

admin.site.register(Hospital)
admin.site.register(City)
admin.site.register(State)
admin.site.register(Medicine)
admin.site.register(Appointment)