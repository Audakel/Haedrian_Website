# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apiv1', '0006_transactionqueue_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='verifygroup',
            name='status',
            field=models.IntegerField(default=1, choices=[(1, b'The transaction is in the queue'), (0, b'The transaction has been confirmed and is out of the queue')]),
            preserve_default=True,
        ),
    ]
