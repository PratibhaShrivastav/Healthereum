from django.db import models

def hospital_profile_pic_path(instance, filename):
    return 'cover_pic/hospital/{0}'.format(instance.name)

class State(models.Model):
    state = models.CharField(max_length=20)

class City(models.Model):
    city = models.CharField(max_length=40)
    state = models.ForeignKey(State, on_delete=models.CASCADE)

class Hospital(models.Model):
    unique_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=50)
    password = models.CharField(max_length=300)
    bio = models.TextField()
    cover_pic = models.ImageField(upload_to=hospital_profile_pic_path, null=True, blank=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    contact = models.CharField(max_length=10)
    fax_number = models.CharField(max_length=20, null=True, blank=True)
    address = models.TextField()
    pincode = models.CharField(max_length=6)
    website = models.CharField(max_length=100, null=True, blank=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE)

class Medicine(models.Model):
    name = models.CharField(max_length=40)
    quantity = models.IntegerField()
    consumption = models.CharField(max_length=10)
    remarks = models.TextField()
