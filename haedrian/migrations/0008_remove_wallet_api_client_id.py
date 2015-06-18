# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0007_wallet_blockchain_address'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='wallet',
            name='api_client_id',
        ),
    ]
