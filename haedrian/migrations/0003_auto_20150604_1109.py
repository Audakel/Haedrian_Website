# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0002_userdata_external'),
    ]

    operations = [
        migrations.AddField(
            model_name='wallet',
            name='currency',
            field=models.CharField(default=b'BTC', max_length=6, choices=[(b'BTC', b'Bitcoin'), (b'PHP', b'Philippine Peso')]),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='wallet',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, default=1, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='wallet',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
    ]
