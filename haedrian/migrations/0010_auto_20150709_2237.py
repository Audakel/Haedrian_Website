# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0009_auto_20150625_1131'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='date_modified',
            field=models.DateTimeField(),
            preserve_default=True,
        ),
    ]
