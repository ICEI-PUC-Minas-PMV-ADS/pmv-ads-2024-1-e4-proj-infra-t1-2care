# Generated by Django 5.0.3 on 2024-04-07 07:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='customusermodel',
            options={'ordering': ['name']},
        ),
    ]