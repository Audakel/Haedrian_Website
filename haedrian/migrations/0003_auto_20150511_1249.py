# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0002_auto_20150509_1322'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdata',
            name='handle',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='userdata',
            name='credit_score',
            field=models.IntegerField(max_length=4),
            preserve_default=True,
        ),
    ]
