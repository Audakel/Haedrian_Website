# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0021_merge'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='amount_local_currency',
            field=models.CharField(default=b'USD', max_length=6, choices=[(b'BTC', b'Bitcoin'), (b'PHP', b'Philippine Peso'), (b'USD', b'United States Dollar')]),
            preserve_default=True,
        ),
    ]
