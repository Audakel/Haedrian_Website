# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apiv1', '0005_verifygroup_creator'),
    ]

    operations = [
        migrations.RenameField(
            model_name='verifygroup',
            old_name='creator',
            new_name='created_by',
        ),
    ]
