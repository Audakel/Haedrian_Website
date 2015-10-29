# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0024_auto_20151027_1632'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdata',
            name='sms_deposit_location',
            field=models.CharField(max_length=30, null=True),
        ),
    ]
