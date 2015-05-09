# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sms', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='smsmessage',
            name='from_city',
            field=models.CharField(max_length=60, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='smsmessage',
            name='from_country',
            field=models.CharField(max_length=10, blank=True),
            preserve_default=True,
        ),
    ]
