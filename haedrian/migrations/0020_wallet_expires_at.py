# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0019_remove_wallet_expires_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='wallet',
            name='expires_at',
            field=models.DateTimeField(default=datetime.datetime(1969, 12, 31, 17, 0)),
            preserve_default=True,
        ),
    ]
