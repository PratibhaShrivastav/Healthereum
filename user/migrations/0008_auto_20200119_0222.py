# Generated by Django 3.0.2 on 2020-01-19 02:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0007_auto_20200119_0133'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Blocks',
            new_name='Block',
        ),
    ]