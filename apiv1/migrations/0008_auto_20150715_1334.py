# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apiv1', '0007_auto_20150710_1223'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transactionqueue',
            name='group',
        ),
        migrations.RemoveField(
            model_name='transactionqueue',
            name='user',
        ),
        migrations.DeleteModel(
            name='TransactionQueue',
        ),
    ]
