# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0001_initial'),
        ('haedrian', '0003_auto_20150511_1249'),
    ]

    operations = [
        migrations.CreateModel(
            name='Wallet',
            fields=[
                ('user', models.ForeignKey(primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('type', models.CharField(default=b'CH', max_length=2, choices=[(b'CH', b'coins.ph'), (b'GM', b'Gem'), (b'SE', b'Self hosted'), (b'TS', b'Fake wallet for testing purposes')])),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RemoveField(
            model_name='project',
            name='category',
        ),
        migrations.RemoveField(
            model_name='project',
            name='user',
        ),
        migrations.DeleteModel(
            name='Project',
        ),
        migrations.RemoveField(
            model_name='userdata',
            name='device_token',
        ),
        migrations.RemoveField(
            model_name='userdata',
            name='handle',
        ),
        migrations.AlterField(
            model_name='userdata',
            name='credit_score',
            field=models.IntegerField(default=0, max_length=4),
            preserve_default=True,
        ),
    ]
