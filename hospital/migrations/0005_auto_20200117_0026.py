# Generated by Django 3.0.2 on 2020-01-17 00:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
        ('hospital', '0004_appointments_status'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Appointments',
            new_name='Appointment',
        ),
    ]
