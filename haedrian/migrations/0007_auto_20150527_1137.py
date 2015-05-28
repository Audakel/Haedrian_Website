# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0006_wallet_blockchain_address'),
    ]

    operations = [
        migrations.RenameField(
            model_name='wallet',
            old_name='wallet_id',
            new_name='api_client_id',
        ),
    ]
