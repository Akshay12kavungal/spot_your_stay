# Generated by Django 5.1 on 2024-11-06 04:27

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('bookings', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('payment_date', models.DateTimeField(auto_now_add=True)),
                ('payment_status', models.CharField(choices=[('completed', 'Completed'), ('failed', 'Failed')], max_length=20)),
                ('booking', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='payment', to='bookings.booking')),
            ],
        ),
    ]
