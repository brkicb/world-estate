# Generated by Django 4.0.5 on 2022-07-04 19:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='listing',
            name='title',
        ),
    ]
