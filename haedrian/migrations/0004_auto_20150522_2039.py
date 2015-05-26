# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0003_userdata_sms_balance'),
    ]

    operations = [
        migrations.AddField(
            model_name='wallet',
            name='access_token',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='wallet',
            name='wallet_id',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
    ]
