from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save

GENDER = (
    ('M','Male'),
    ('F','Female'),
)

def user_profile_pic_path(instance, filename):
    return 'profile_pic/doc/{0}'.format(instance.user.username)

class Specialization(models.Model):
    field_name = models.CharField(max_length=15)

    def __str__(self):
        return self.field_name

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_pic = models.ImageField(upload_to=user_profile_pic_path, null=True, blank=True)
    contact = models.CharField(max_length=10)
    age = models.IntegerField()
    gender = models.CharField(choices=GENDER, max_length=1)
    email = models.CharField(max_length=20, blank=True, null=False)
    unique_id = models.CharField(unique=True, max_length=20)
    address = models.TextField()
    pincode = models.CharField(max_length=6)
    city = models.ForeignKey('hospital.City', on_delete=models.CASCADE)
    skills = models.ManyToManyField(Specialization)
    hospital = models.ForeignKey('hospital.Hospital', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username + ' (D)'


class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    contact = models.CharField(max_length=10)
    age = models.IntegerField()
    gender = models.CharField(max_length=1, choices=GENDER)
    address = models.TextField()
    pincode = models.CharField(max_length=6)
    city = models.ForeignKey('hospital.City', on_delete=models.CASCADE)
    unique_id = models.CharField(unique=True, max_length=20)
    
    def __str__(self):
        return self.user.username + ' (P)'

class Block(models.Model):
    number = models.IntegerField()
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='blocks')

    def __str__(self):
        return self.patient.user.username+' '+self.number