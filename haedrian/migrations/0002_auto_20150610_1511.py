# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdata',
            name='app_external_id',
            field=models.CharField(default=None, max_length=50, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='userdata',
            name='app_internal_id',
            field=models.CharField(default=None, max_length=50, blank=True),
            preserve_default=True,
        ),
    ]
