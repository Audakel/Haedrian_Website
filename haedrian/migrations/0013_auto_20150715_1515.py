# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0012_auto_20150715_1334'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='type',
            field=models.CharField(default=b'Repay', max_length=2, choices=[(b'Repay', b'Loan Repayment'), (b'Send', b'Send'), (b'Fee', b'Fee')]),
            preserve_default=True,
        ),
    ]
