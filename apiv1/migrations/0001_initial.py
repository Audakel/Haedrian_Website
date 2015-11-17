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
            name='SupportedCurrencies',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('currency_code', models.CharField(max_length=3)),
                ('full_name', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='VerifyGroup',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('group_id', models.CharField(max_length=40, null=True)),
                ('size', models.IntegerField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('buy_order_id', models.CharField(default=b'', max_length=60)),
                ('buy_confirmed', models.BooleanField(default=False)),
                ('send_confirmed', models.BooleanField(default=False)),
                ('total_payment', models.DecimalField(max_digits=30, decimal_places=8)),
                ('currency', models.CharField(default=b'USD', max_length=3)),
                ('created_by', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='VerifyPerson',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('mifos_id', models.CharField(default=1, max_length=50)),
                ('phone', models.CharField(max_length=30)),
                ('amount', models.DecimalField(max_digits=30, decimal_places=10)),
                ('confirmed', models.BooleanField(default=False)),
                ('group', models.ForeignKey(to='apiv1.VerifyGroup')),
            ],
        ),
    ]
