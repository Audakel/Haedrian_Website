# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0010_auto_20150709_2237'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='date_modified',
            field=models.DateTimeField(auto_now_add=True),
            preserve_default=True,
        ),
    ]
