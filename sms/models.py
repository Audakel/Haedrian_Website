from django.db import models

# Create your models here.
class SmsMessage(models.Model):
    from_number = models.CharField(max_length=30)
    to_number = models.CharField(max_length=30)
    message_body = models.CharField(max_length=300)
    created = models.DateTimeField(auto_now_add=True)
    from_city = models.CharField(max_length=60, blank=True)
    from_country = models.CharField(max_length=10, blank=True)

    def __str__(self):
        return self.from_number