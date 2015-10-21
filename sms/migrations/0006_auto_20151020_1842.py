# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sms', '0005_pendingdeposit'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pendingdeposit',
            old_name='confirmed',
            new_name='user_confirmed',
        ),
        migrations.AddField(
            model_name='pendingdeposit',
            name='currency',
            field=models.CharField(default=b'PHP', max_length=3),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='pendingdeposit',
            name='expired',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
