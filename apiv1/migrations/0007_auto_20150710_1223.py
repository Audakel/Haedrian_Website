# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apiv1', '0006_auto_20150710_1041'),
    ]

    operations = [
        migrations.AlterField(
            model_name='verifygroup',
            name='group_id',
            field=models.CharField(max_length=40, null=True),
            preserve_default=True,
        ),
    ]
