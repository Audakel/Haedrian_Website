# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apiv1', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SupportedCurrencies',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('currency_code', models.CharField(max_length=3)),
                ('full_name', models.CharField(max_length=40)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
