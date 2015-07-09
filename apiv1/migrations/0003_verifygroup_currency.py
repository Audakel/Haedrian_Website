# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apiv1', '0002_supportedcurrencies'),
    ]

    operations = [
        migrations.AddField(
            model_name='verifygroup',
            name='currency',
            field=models.ForeignKey(default=3, to='apiv1.SupportedCurrencies'),
            preserve_default=True,
        ),
    ]
