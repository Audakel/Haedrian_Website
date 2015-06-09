# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0002_userdata_external'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Organization',
        ),
        migrations.RenameField(
            model_name='userdata',
            old_name='external',
            new_name='app_external_id',
        ),
        migrations.RemoveField(
            model_name='wallet',
            name='blockchain_address',
        ),
        migrations.AddField(
            model_name='userdata',
            name='app_internal_id',
            field=models.CharField(default=b'', max_length=50, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='userdata',
            name='application',
            field=models.CharField(blank=True, max_length=7, choices=[(b'MENTORS', 'Mentors International')]),
            preserve_default=True,
        ),
        migrations.AlterUniqueTogether(
            name='userdata',
            unique_together=set([('application', 'app_internal_id'), ('application', 'app_external_id')]),
        ),
        migrations.RemoveField(
            model_name='userdata',
            name='sms_balance',
        ),
    ]
