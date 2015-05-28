# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('apiv1', '0002_auto_20150527_1242'),
    ]

    operations = [
        migrations.AlterField(
            model_name='externaluser',
            name='user',
            field=models.ForeignKey(related_name='external', blank=True, to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
    ]
