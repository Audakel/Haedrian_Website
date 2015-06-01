# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdata',
            name='sms_pending_balance',
            field=models.DecimalField(default=0, max_digits=12, decimal_places=4),
            preserve_default=True,
        ),
    ]
