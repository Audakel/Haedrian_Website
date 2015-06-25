# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0006_auto_20150617_1030'),
    ]

    operations = [
        migrations.AddField(
            model_name='wallet',
            name='blockchain_address',
            field=models.CharField(default=b'', max_length=80),
            preserve_default=True,
        ),
    ]