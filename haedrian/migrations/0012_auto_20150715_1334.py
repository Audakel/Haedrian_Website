# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apiv1', '0008_auto_20150715_1334'),
        ('haedrian', '0011_auto_20150710_1041'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='group',
            field=models.ForeignKey(to='apiv1.VerifyGroup', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='transaction',
            name='payment_confirmed',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='transaction',
            name='sent_payment_id',
            field=models.CharField(default='', max_length=40),
            preserve_default=False,
        ),
    ]
