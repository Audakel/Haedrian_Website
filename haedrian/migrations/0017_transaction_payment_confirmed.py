# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0016_remove_transaction_payment_confirmed'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='payment_confirmed',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
