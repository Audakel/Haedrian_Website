# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0018_transaction_mifos_confirmed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='wallet',
            name='expires_at',
        ),
    ]
