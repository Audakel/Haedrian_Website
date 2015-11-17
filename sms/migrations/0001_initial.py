# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
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
        ),
        migrations.CreateModel(
            name='PendingDeposit',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('order_id', models.CharField(max_length=60)),
                ('user_confirmed', models.BooleanField(default=False)),
                ('exchange_confirmed', models.BooleanField(default=False)),
                ('expired', models.BooleanField(default=False)),
                ('amount', models.DecimalField(max_digits=30, decimal_places=8)),
                ('currency', models.CharField(default=b'PHP', max_length=3)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Signup',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('phone_number', models.CharField(max_length=30)),
                ('user_handle', models.CharField(default=b'', max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='SmsDepositor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('phone_number', models.CharField(max_length=30)),
            ],
        ),
    ]
