# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='VerifyGroup',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('group_id', models.CharField(unique=True, max_length=40)),
                ('size', models.IntegerField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='VerifyPerson',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('personal_id', models.CharField(max_length=40)),
                ('phone', models.CharField(max_length=30)),
                ('amount', models.DecimalField(max_digits=30, decimal_places=10)),
                ('confirmed', models.BooleanField(default=False)),
                ('group_id', models.ForeignKey(to='apiv1.VerifyGroup')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
