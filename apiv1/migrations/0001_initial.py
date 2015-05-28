# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ExternalUser',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('application', models.CharField(max_length=7, choices=[(b'MENTORS', b'Mentors International')])),
                ('external_id', models.CharField(default=b'', max_length=50, blank=True)),
                ('resource_id', models.IntegerField()),
                ('user', models.OneToOneField(related_name='external', to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AlterUniqueTogether(
            name='externaluser',
            unique_together=set([('application', 'resource_id')]),
        ),
    ]
