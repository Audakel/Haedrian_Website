# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0015_merge'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transaction',
            name='payment_confirmed',
        ),
    ]
