# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apiv1', '0003_verifygroup_created'),
    ]

    operations = [
        migrations.AddField(
            model_name='verifygroup',
            name='buy_confirmed',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='verifygroup',
            name='buy_order_id',
            field=models.CharField(default=b'', max_length=60),
            preserve_default=True,
        ),
    ]
