# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apiv1', '0009_auto_20150731_1225'),
    ]

    operations = [
        migrations.AddField(
            model_name='verifygroup',
            name='send_confirmed',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
