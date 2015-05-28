# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apiv1', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MifosxData',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('resourceId', models.IntegerField()),
                ('officeId', models.IntegerField(blank=True)),
                ('groupId', models.IntegerField(blank=True)),
                ('clientId', models.IntegerField(blank=True)),
                ('loanId', models.IntegerField(blank=True)),
                ('savingsId', models.IntegerField(blank=True)),
                ('productId', models.IntegerField(blank=True)),
                ('subResourceId', models.IntegerField(blank=True)),
                ('transactionId', models.CharField(default=b'', max_length=50, blank=True)),
                ('resourceIdentifier', models.CharField(default=b'', max_length=50, blank=True)),
                ('user', models.ForeignKey(related_name='mifosx_data', to='apiv1.ExternalUser', unique=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AlterUniqueTogether(
            name='externaluser',
            unique_together=set([]),
        ),
        migrations.RemoveField(
            model_name='externaluser',
            name='resource_id',
        ),
        migrations.RemoveField(
            model_name='externaluser',
            name='external_id',
        ),
    ]
