# Generated by Django 3.0.2 on 2020-01-17 01:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hospital', '0007_appointment_hospital'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='hospital',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hospital.Hospital'),
        ),
    ]
