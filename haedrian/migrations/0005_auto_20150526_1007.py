# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0004_auto_20150522_2039'),
    ]

    operations = [
        migrations.AddField(
            model_name='wallet',
            name='expires_at',
            field=models.CharField(default=b'', max_length=60),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='wallet',
            name='refresh_token',
            field=models.CharField(default=b'', max_length=60),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='wallet',
            name='access_token',
            field=models.CharField(default=b'', max_length=60),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='wallet',
            name='wallet_id',
            field=models.CharField(default=b'', max_length=60),
            preserve_default=True,
        ),
    ]
