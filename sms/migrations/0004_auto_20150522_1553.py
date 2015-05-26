# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sms', '0003_smssignup'),
    ]

    operations = [
        migrations.CreateModel(
            name='Depositor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('short_name', models.CharField(unique=True, max_length=6)),
                ('long_name', models.CharField(max_length=40)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('from_number', models.CharField(max_length=30)),
                ('to_number', models.CharField(max_length=30)),
                ('message_body', models.CharField(max_length=400)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('from_city', models.CharField(max_length=60, blank=True)),
                ('from_country', models.CharField(max_length=10, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RenameModel(
            old_name='SmsSignup',
            new_name='Signup',
        ),
        migrations.DeleteModel(
            name='SmsMessage',
        ),
    ]
