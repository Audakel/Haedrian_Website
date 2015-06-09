
# class MifosxData(models.Model):
#     user = models.ForeignKey(ExternalUser, unique=True, related_name='mifosx_data')
#     resourceId = models.IntegerField(blank=False)
#     officeId = models.IntegerField(blank=True, null=True)
#     groupId = models.IntegerField(blank=True, null=True)
#     clientId = models.IntegerField(blank=True, null=True)
#     loanId = models.IntegerField(blank=True, null=True)
#     savingsId = models.IntegerField(blank=True, null=True)
#     productId = models.IntegerField(blank=True, null=True)
#     subResourceId = models.IntegerField(blank=True, null=True)
#     # changes = new HashMap<>()
#     transactionId = models.CharField(max_length=50, blank=True, default='')
#     resourceIdentifier = models.CharField(max_length=50, blank=True, default='')