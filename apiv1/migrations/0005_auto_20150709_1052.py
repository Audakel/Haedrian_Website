# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apiv1', '0004_auto_20150709_1031'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='verifyperson',
            name='userdata',
        ),
        migrations.AddField(
            model_name='verifyperson',
            name='mifos_id',
            field=models.CharField(default=1, max_length=50),
            preserve_default=True,
        ),
    ]
