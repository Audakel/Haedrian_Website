# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0008_remove_wallet_api_client_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userdata',
            old_name='app_internal_id',
            new_name='app_id',
        ),
        migrations.AlterUniqueTogether(
            name='userdata',
            unique_together=set([('application', 'app_id')]),
        ),
        migrations.RemoveField(
            model_name='userdata',
            name='app_external_id',
        ),
    ]
