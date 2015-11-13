# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sms', '0008_auto_20151020_1941'),
    ]

    operations = [
        migrations.CreateModel(
            name='SmsDepositor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('phone_number', models.CharField(max_length=30)),
            ],
        ),
        migrations.DeleteModel(
            name='Depositor',
        ),
    ]
