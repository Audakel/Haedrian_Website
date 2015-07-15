# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0010_auto_20150709_2237'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExchangeRates',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('provider', models.CharField(max_length=50)),
                ('code_from', models.CharField(max_length=3)),
                ('code_to', models.CharField(max_length=3)),
                ('buy', models.DecimalField(max_digits=20, decimal_places=10)),
                ('sell', models.DecimalField(max_digits=20, decimal_places=10)),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.DeleteModel(
            name='BitcoinRates',
        ),
        migrations.AlterField(
            model_name='transaction',
            name='date_modified',
            field=models.DateTimeField(auto_now_add=True),
            preserve_default=True,
        ),
    ]
