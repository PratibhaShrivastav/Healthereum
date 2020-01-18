from django.db import models
from django.contrib.auth.models import User


def hospital_profile_pic_path(instance, filename):
    return 'cover_pic/hospital/{0}'.format(instance.name)

class State(models.Model):
    state = models.CharField(max_length=20)

    def __str__(self):
        return self.state


class City(models.Model):
    city = models.CharField(max_length=40)
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name='cities')

    def __str__(self):
        return self.city+' ('+self.state.state+')'

class Hospital(models.Model):
    unique_id = models.CharField(max_length=50, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='hospital')
    bio = models.TextField()
    cover_pic = models.ImageField(upload_to=hospital_profile_pic_path, null=True, blank=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    contact = models.CharField(max_length=10)
    fax_number = models.CharField(max_length=20, null=True, blank=True)
    address = models.TextField()
    pincode = models.CharField(max_length=6)
    website = models.CharField(max_length=100, null=True, blank=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='my_hospitals')

    def __str__(self):
        return self.user.username + '(H)'

class Medicine(models.Model):
    name = models.CharField(max_length=40)
    quantity = models.IntegerField()
    consumption = models.CharField(max_length=10)
    remarks = models.TextField()

    def __str__(self):
        return self.name

class Appointment(models.Model):
    patient = models.ForeignKey('user.Patient', on_delete=models.CASCADE, related_name='my_appointments')
    disease = models.TextField()
    reviewed = models.BooleanField(default=False)
    status = models.BooleanField(default=False)
    complete = models.BooleanField(default=False)
    assigned_doctor = models.ForeignKey('user.Doctor', null=True, blank=True, on_delete=models.SET_NULL, related_name='my_appointments')
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='appointments')
    
    def __str__(self):
        return self.patient.user.username+'\'s appointment to Dr.'+ self.hospital.name