from django.db import models
from django_countries.fields import CountryField


class BetaApplicant(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    country = CountryField()
    reason = models.TextField()