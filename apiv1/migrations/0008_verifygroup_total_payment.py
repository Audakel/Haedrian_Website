# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apiv1', '0007_auto_20150618_1052'),
    ]

    operations = [
        migrations.AddField(
            model_name='verifygroup',
            name='total_payment',
            field=models.DecimalField(default=10, max_digits=30, decimal_places=10),
            preserve_default=False,
        ),
    ]
