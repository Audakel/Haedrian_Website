# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('haedrian', '0025_userdata_sms_deposit_location'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdata',
            name='application',
            field=models.CharField(blank=True, max_length=30, choices=[(b'mi-asia', 'Mentors Asia'), (b'mi-africa', 'Mentors Africa'), (b'mi-latam', 'Mentors Latin America'), (b'ashi', 'Ahon sa Hirap, Inc'), (b'test', 'Haedrian Test')]),
        ),
    ]
