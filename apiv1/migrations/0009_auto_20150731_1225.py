# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apiv1', '0008_auto_20150715_1334'),
    ]

    operations = [
        migrations.AlterField(
            model_name='verifygroup',
            name='total_payment',
            field=models.DecimalField(max_digits=30, decimal_places=8),
            preserve_default=True,
        ),
    ]
