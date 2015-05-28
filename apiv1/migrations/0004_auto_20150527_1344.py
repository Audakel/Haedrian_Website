# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apiv1', '0003_auto_20150527_1341'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mifosxdata',
            name='clientId',
            field=models.IntegerField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='mifosxdata',
            name='groupId',
            field=models.IntegerField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='mifosxdata',
            name='loanId',
            field=models.IntegerField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='mifosxdata',
            name='officeId',
            field=models.IntegerField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='mifosxdata',
            name='productId',
            field=models.IntegerField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='mifosxdata',
            name='savingsId',
            field=models.IntegerField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='mifosxdata',
            name='subResourceId',
            field=models.IntegerField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
