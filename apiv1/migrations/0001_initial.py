# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0009_auto_20150625_1131'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='TransactionQueue',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('sent_payment_id', models.CharField(max_length=40)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='VerifyGroup',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('group_id', models.CharField(unique=True, max_length=40)),
                ('size', models.IntegerField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('buy_order_id', models.CharField(default=b'', max_length=60)),
                ('buy_confirmed', models.BooleanField(default=False)),
                ('total_payment', models.DecimalField(max_digits=30, decimal_places=10)),
                ('created_by', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='VerifyPerson',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('phone', models.CharField(max_length=30)),
                ('amount', models.DecimalField(max_digits=30, decimal_places=10)),
                ('confirmed', models.BooleanField(default=False)),
                ('group', models.ForeignKey(to='apiv1.VerifyGroup')),
                ('userdata', models.ForeignKey(to='haedrian.UserData')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='transactionqueue',
            name='group',
            field=models.ForeignKey(to='apiv1.VerifyGroup', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='transactionqueue',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
    ]
