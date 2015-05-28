# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0005_auto_20150526_1007'),
    ]

    operations = [
        migrations.AddField(
            model_name='wallet',
            name='blockchain_address',
            field=models.CharField(default=b'', max_length=60),
            preserve_default=True,
        ),
    ]
