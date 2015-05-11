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
            name='credit_score',
            field=models.IntegerField(default=0, max_length=4),
            preserve_default=True,
        ),
    ]
