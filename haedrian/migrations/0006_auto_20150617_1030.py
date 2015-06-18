# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0005_auto_20150610_1646'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wallet',
            name='currency',
            field=models.CharField(default=b'BTC', max_length=6, choices=[(b'BTC', b'Bitcoin'), (b'PHP', b'Philippine Peso'), (b'USD', b'United States Dollar')]),
            preserve_default=True,
        ),
    ]
