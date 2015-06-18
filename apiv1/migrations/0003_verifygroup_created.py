# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('apiv1', '0002_auto_20150615_1139'),
    ]

    operations = [
        migrations.AddField(
            model_name='verifygroup',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2015, 6, 15, 14, 13, 33, 67224), auto_now_add=True),
            preserve_default=False,
        ),
    ]
