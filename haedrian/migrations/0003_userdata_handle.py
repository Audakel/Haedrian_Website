# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0002_auto_20150516_1216'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdata',
            name='handle',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
    ]
