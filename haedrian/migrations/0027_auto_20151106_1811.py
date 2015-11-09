# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0026_auto_20151106_1811'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdata',
            name='credit_score',
            field=models.IntegerField(default=0),
        ),
    ]
