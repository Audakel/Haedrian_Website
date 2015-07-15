# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0013_auto_20150715_1515'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='type',
            field=models.CharField(default=b'Re', max_length=2, choices=[(b'Re', b'Loan Repayment'), (b'Se', b'Send'), (b'Fe', b'Fee')]),
            preserve_default=True,
        ),
    ]
