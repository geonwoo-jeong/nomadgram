# Generated by Django 2.0.8 on 2018-08-14 12:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0003_auto_20180814_2043'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='comment',
            field=models.TextField(blank=True, null=True),
        ),
    ]
