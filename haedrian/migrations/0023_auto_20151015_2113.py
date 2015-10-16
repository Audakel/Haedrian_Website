# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0022_auto_20150731_1414'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdata',
            name='application',
            field=models.CharField(max_length=40, blank=True),
            preserve_default=True,
        ),
    ]
