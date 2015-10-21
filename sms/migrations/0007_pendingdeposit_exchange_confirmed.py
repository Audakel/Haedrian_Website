# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sms', '0006_auto_20151020_1842'),
    ]

    operations = [
        migrations.AddField(
            model_name='pendingdeposit',
            name='exchange_confirmed',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
