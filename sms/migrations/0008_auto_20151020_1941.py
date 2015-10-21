# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sms', '0007_pendingdeposit_exchange_confirmed'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pendingdeposit',
            name='time',
            field=models.DateTimeField(auto_now_add=True),
            preserve_default=True,
        ),
    ]
