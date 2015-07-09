# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apiv1', '0003_verifygroup_currency'),
    ]

    operations = [
        migrations.AlterField(
            model_name='verifygroup',
            name='currency',
            field=models.CharField(default=b'USD', max_length=3),
            preserve_default=True,
        ),
    ]
