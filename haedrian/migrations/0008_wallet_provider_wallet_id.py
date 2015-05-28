# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0007_auto_20150527_1137'),
    ]

    operations = [
        migrations.AddField(
            model_name='wallet',
            name='provider_wallet_id',
            field=models.CharField(default=b'', max_length=60),
            preserve_default=True,
        ),
    ]
