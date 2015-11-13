# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0027_auto_20151106_1811'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userdata',
            old_name='app_id',
            new_name='org_id',
        ),
        migrations.RenameField(
            model_name='userdata',
            old_name='application',
            new_name='organization',
        ),
        migrations.AlterUniqueTogether(
            name='userdata',
            unique_together=set([('organization', 'org_id')]),
        ),
    ]
