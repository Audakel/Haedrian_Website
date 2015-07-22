# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0017_transaction_payment_confirmed'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='mifos_confirmed',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
