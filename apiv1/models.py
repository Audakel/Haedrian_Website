from django.db import models
from django.conf import settings

class ExternalUser(models.Model):
    MENTORS = 'MENTORS'
    APPLICATIONS = (
        (MENTORS, 'Mentors International',),
    )
    application = models.CharField(max_length=7, blank=False, choices=APPLICATIONS)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='external', blank=True, null=True)

class MifosxData(models.Model):
    user = models.ForeignKey(ExternalUser, unique=True, related_name='mifosx_data')
    resourceId = models.IntegerField(blank=False)
    officeId = models.IntegerField(blank=True, null=True)
    groupId = models.IntegerField(blank=True, null=True)
    clientId = models.IntegerField(blank=True, null=True)
    loanId = models.IntegerField(blank=True, null=True)
    savingsId = models.IntegerField(blank=True, null=True)
    productId = models.IntegerField(blank=True, null=True)
    subResourceId = models.IntegerField(blank=True, null=True)
    # changes = new HashMap<>()
    transactionId = models.CharField(max_length=50, blank=True, default='')
    resourceIdentifier = models.CharField(max_length=50, blank=True, default='')