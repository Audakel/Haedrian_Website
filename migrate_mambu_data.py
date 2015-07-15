#!/usr/bin/env python
import os
import sys
import django
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Haedrian_Website.settings.development")
django.setup()

from apiv1.models import mambu
from apiv1.models import mifosx

def update_progress(progress, barLength = 10):
    status = ""
    if isinstance(progress, int):
        progress = float(progress)
    if not isinstance(progress, float):
        progress = 0
        status = "error: progress var must be float\r\n"
    if progress < 0:
        progress = 0
        status = "Halt...\r\n"
    if progress >= 1:
        progress = 1
        status = "Done...\r\n"
    block = int(round(barLength*progress))
    text = "\r[{0}] {1}% {2}".format( "#"*block + "-"*(barLength-block), progress*100, status)
    sys.stdout.write(text)
    sys.stdout.flush()

# migrate all the branches to offices under the Head Office
def migrate_branch():
    print("Migrating Branches")
    branches = mambu.Branch.objects.using('mambu').all()
    offices = mifosx.MOffice.objects.using('mifosx').all()
    if len(branches) < len(offices):
        print("Branches already migrated. Skipping")
        return
    head_office = mifosx.MOffice.objects.using('mifosx').get(name="Head Office")
    for i, branch in enumerate(branches):
        office = mifosx.MOffice(
                parent = head_office,
                hierarchy = '.2.',
                external_id = branch.encodedkey,
                name = branch.name,
                opening_date = branch.creationdate,
            )
        try:
            office.save(using='mifosx')
        except IntegrityError as e:
            pass
        update_progress((i+1) / len(branches), len(branches))
    print("Migrating branches complete.")

def migrate_fund():
    print("Migrating Funds")
    # mam = mambu.Loanproduct.objects.using('mambu').all()
    # mif = mifosx.MProductLoan.objects.using('mifosx').all()
    # if len(mam) <= len(mif):
    #     print("Loan Products already migrated. Skipping")
    #     return
    # for i, loan in enumerate(mam):
    print("Migrating Funds Complete (jk I don't know where Funds are in Mambu)")

def migrate_loanproduct():
    print("Migrating Loan Products")
    mam = mambu.Loanproduct.objects.using('mambu').all()
    mif = mifosx.MProductLoan.objects.using('mifosx').all()
    if len(mam) <= len(mif):
        print("Loan Products already migrated. Skipping")
        return
    for i, loan in enumerate(mam):
        m = mifosx.MProductLoan(
            external_id = loan.encodedkey,
            short_name = 'ph' + loan.id[-2:],
            currency_code = 'PHP', # TODO: don't hardcode this? where is this found
            currency_digits = 2,
            principal_amount = loan.defaultloanamount,
            min_principal_amount = loan.minloanamount,
            max_principal_amount = loan.maxloanamount,
            name = loan.productname,
            description = loan.productdescription,
            nominal_interest_rate_per_period = loan.defaultinterestrate,
            min_nominal_interest_rate_per_period = loan.mininterestrate,
            max_nominal_interest_rate_per_period = loan.maxinterestrate,
            interest_period_frequency_enum = mifosx.SAME_AS_REPAYMENT_PERIOD,
            # interest rate is per week 1%
            annual_nominal_interest_rate = loan.defaultinterestrate * 52,

            number_of_repayments = loan.defaultnuminstallments,
            min_number_of_repayments = loan.minnuminstallments,
            max_number_of_repayments = loan.maxnuminstallments,

            # required
            repay_every = 1, # mambu DEFAULTPRINCIPALREPAYMENTINTERVAL
            repayment_period_frequency_enum = 1, # 0=Days, 1=Weeks, 2=Months
            # 0=DECLINING_BALANCE, 1=FLAT, 2=INVALID
            interest_method_enum = 1,
            # 0=EQUAL_PRINCIPAL, 1=EQUAL_INSTALLMENTS, 2=INVALID
            amortization_method_enum = 1,
            # https://github.com/openMF/mifosx/blob/develop/mifosng-provider/src/main/java/org/mifosplatform/accounting/common/AccountingRuleType.java#L13
            # 1=NONE, 2=CASH_BASED, 3=ACCRUAL_PERIODIC, 4=ACCRUAL_UPFRONT
            accounting_type = 2,
            # 0=DAILY, 1=SAME_AS_REPAYMENT_PERIOD, 2=INVALID
            interest_calculated_in_period_enum = 1,

            # has default value
            include_in_borrower_cycle = 0,
            use_borrower_cycle = 0,
            days_in_month_enum = 1,
            days_in_year_enum = 1,
            allow_multiple_disbursals = 0,
            interest_recalculation_enabled = 0,
            hold_guarantee_funds = 0,
            account_moves_out_of_npa_only_on_arrears_completion = 0,
            can_define_fixed_emi_amount = 0,
            principal_threshold_for_last_installment = 50.00,

            # other not required fields
            # currency_multiplesof = models.IntegerField(blank=True, null=True)
            # arrearstolerance_amount = models.DecimalField(max_digits=19, decimal_places=6, blank=True, null=True)
            # fund = models.ForeignKey(MFund, blank=True, null=True)
            # grace_on_principal_periods = models.IntegerField(blank=True, null=True)
            # grace_on_interest_periods = models.IntegerField(blank=True, null=True)
            # grace_interest_free_periods = models.IntegerField(blank=True, null=True)
            # loan_transaction_strategy = models.ForeignKey('RefLoanTransactionProcessingStrategy', blank=True, null=True)
            # external_id = models.CharField(unique=True, max_length=100, blank=True)
            # start_date = models.DateField(blank=True, null=True)
            # close_date = models.DateField(blank=True, null=True)
            # max_disbursals = models.IntegerField(blank=True, null=True)
            # max_outstanding_loan_balance = models.DecimalField(max_digits=19, decimal_places=6, blank=True, null=True)
            # grace_on_arrears_ageing = models.IntegerField(blank=True, null=True)
            # overdue_days_for_npa = models.IntegerField(blank=True, null=True)
            # min_days_between_disbursal_and_first_repayment = models.IntegerField(blank=True, null=True)
            # instalment_amount_in_multiples_of = models.DecimalField(max_digits=19, decimal_places=6, blank=True, null=True)
        )
        m.save(using='mifosx')
        # if i % 100 == 0:
        #     print ("Progress: {}".format(i))
    print ("Migrating Loan Products complete")


def migrate_loans():
    print("Migrating Loans")
    mam = mambu.Loanaccount.objects.using('mambu').all()
    mif = mifosx.MLoan.objects.using('mifosx').all()
    # if len(mam) <= len(mif):
    #     print("Loans already migrated. Skipping")
    #     return

    from datetime import timedelta, datetime
    import pytz
    now = datetime.now(tz=pytz.utc)
    for i, loan in enumerate(mam):
        # grp = mifosx.MGroup.objects.using('mifosx').get(external_id=loan.groupkey.encodedkey)
        cli = mifosx.MClient.objects.using('mifosx').get(external_id=loan.accountholderkey)
        prod = mifosx.MProductLoan.objects.using('mifosx').get(external_id=loan.producttypekey.encodedkey)
        # mambu_prod = mambu.Loanproduct.objects.using('mambu').get(encodedkey=loan.producttypekey)
        if loan.accountstate:
            if loan.accountstate == "ACTIVE":
                loan_status_id = mifosx.LOAN_ACTIVE
            elif loan.accountstate == "ACTIVE_IN_ARREARS":
                loan_status_id = mifosx.LOAN_ACTIVE
            elif loan.accountstate == "APPROVED":
                loan_status_id = mifosx.LOAN_APPROVED
            elif loan.accountstate == "CLOSED":
                loan_status_id = mifosx.LOAN_CLOSED
            elif loan.accountstate == "CLOSED_WRITTEN_OFF":
                loan_status_id = mifosx.LOAN_WRITTEN_OFF
            elif loan.accountstate == "PENDING_APPROVAL":
                loan_status_id = mifosx.LOAN_SUBMITTED
            else:
                loan_status_id = mifosx.LOAN_INVALID
        else:
            loan_status_id = mifosx.LOAN_INVALID
        if loan.accountholdertype:
            if loan.accountholdertype == "CLIENT":
                loan_type_enum = mifosx.LOAN_TYPE_INDIVIDUAL
            else:
                loan_type_enum = mifosx.LOAN_TYPE_INVALID
        else:
            loan_type_enum = mifosx.LOAN_TYPE_INVALID

        if loan.repaymentperiodunit == "DAYS":
            repayment_period_frequency_enum = mifosx.TERM_PERIOD_DAYS
        elif loan.repaymentperiodunit == "WEEKS":
            repayment_period_frequency_enum = mifosx.TERM_PERIOD_WEEKS
        elif loan.repaymentperiodunit == "MONTHS":
            repayment_period_frequency_enum = mifosx.TERM_PERIOD_MONTHS
        else:
            repayment_period_frequency_enum = mifosx.TERM_PERIOD_YEARS
        if loan.lastsettoarrearsdate and loan.lastsettoarrearsdate + timedelta(days=90) <= now:
            is_npa = 1
        else:
            is_npa = 0

        l = mifosx.MLoan(
            account_no = "{0:09d}".format(random.randrange(0,999999999)),
            external_id = loan.encodedkey,
            client = cli,
            # group = grp,
            product = prod,
            # fund = models.ForeignKey(MFund, blank=True, null=True)
            # loan_officer = models.ForeignKey('MStaff', blank=True, null=True)
            # loanpurpose_cv = models.ForeignKey(MCodeValue, blank=True, null=True)
            loan_status_id = loan_status_id,
            loan_type_enum = loan_type_enum,
            currency_code = 'PHP',
            currency_digits = 2,
            # currency_multiplesof = models.IntegerField(blank=True, null=True)

            # During loan origination stage and before loan is approved
            # principal_amount, approved_principal and principal_amount_demanded
            # will same amount and that amount is same as applicant loan demanded amount.
            principal_amount_proposed = loan.loanamount,
            principal_amount = loan.principalbalance or loan.loanamount,
            approved_principal = loan.loanamount,
            # arrearstolerance_amount = models.DecimalField(max_digits=19, decimal_places=6, blank=True, null=True)
            nominal_interest_rate_per_period = loan.interestrate,
            interest_period_frequency_enum = mifosx.SAME_AS_REPAYMENT_PERIOD,
            # TODO fix this its wrong see above
            annual_nominal_interest_rate = loan.interestrate * 13,
            # 1=FLAT
            interest_method_enum = 1,
            interest_calculated_in_period_enum = mifosx.SAME_AS_REPAYMENT_PERIOD,
            # using default values for term_*
            term_frequency = 0,
            term_period_frequency_enum = 2,
            repay_every = loan.repaymentperiodcount,
            repayment_period_frequency_enum = repayment_period_frequency_enum,
            # repayment_frequency_nth_day_enum = models.IntegerField(blank=True, null=True)
            # repayment_frequency_day_of_week_enum = models.IntegerField(blank=True, null=True)
            number_of_repayments = prod.number_of_repayments,
            # grace_on_principal_periods = models.IntegerField(blank=True, null=True)
            # grace_on_interest_periods = models.IntegerField(blank=True, null=True)
            # grace_interest_free_periods = models.IntegerField(blank=True, null=True)
            # 0=EQUAL_PRINCIPAL, 1=EQUAL_INSTALLMENTS, 2=INVALID
            amortization_method_enum = 1,
            # submittedon_date = models.DateField(blank=True, null=True)
            # submittedon_userid = models.ForeignKey(MAppuser, db_column='submittedon_userid', blank=True, null=True)
            # approvedon_date = models.DateField(blank=True, null=True)
            # approvedon_userid = models.ForeignKey(MAppuser, db_column='approvedon_userid', blank=True, null=True)
            # expected_disbursedon_date = models.DateField(blank=True, null=True)
            # expected_firstrepaymenton_date = models.DateField(blank=True, null=True)
            # interest_calculated_from_date = models.DateField(blank=True, null=True)
            # disbursedon_date = models.DateField(blank=True, null=True)
            # disbursedon_userid = models.ForeignKey(MAppuser, db_column='disbursedon_userid', blank=True, null=True)
            # expected_maturedon_date = models.DateField(blank=True, null=True)
            # maturedon_date = models.DateField(blank=True, null=True)
            # closedon_date = models.DateField(blank=True, null=True)
            # closedon_userid = models.ForeignKey(MAppuser, db_column='closedon_userid', blank=True, null=True)
            # total_charges_due_at_disbursement_derived = models.DecimalField(max_digits=19, decimal_places=6, blank=True, null=True)

            # set all the derived fields to the default 0 and hope for the best?
            principal_disbursed_derived = 0,
            principal_repaid_derived = 0,
            principal_writtenoff_derived = 0,
            principal_outstanding_derived = 0,
            interest_charged_derived = 0,
            interest_repaid_derived = 0,
            interest_waived_derived = 0,
            interest_writtenoff_derived = 0,
            interest_outstanding_derived = 0,
            fee_charges_charged_derived = 0,
            fee_charges_repaid_derived = 0,
            fee_charges_waived_derived = 0,
            fee_charges_writtenoff_derived = 0,
            fee_charges_outstanding_derived = 0,
            penalty_charges_charged_derived = 0,
            penalty_charges_repaid_derived = 0,
            penalty_charges_waived_derived = 0,
            penalty_charges_writtenoff_derived = 0,
            penalty_charges_outstanding_derived = 0,
            total_expected_repayment_derived = 0,
            total_repayment_derived = 0,
            total_expected_costofloan_derived = 0,
            total_costofloan_derived = 0,
            total_waived_derived = 0,
            total_writtenoff_derived = 0,
            total_outstanding_derived = 0,
            # total_overpaid_derived = models.DecimalField(max_digits=19, decimal_places=6, blank=True, null=True)
            # rejectedon_date = models.DateField(blank=True, null=True)
            # rejectedon_userid = models.ForeignKey(MAppuser, db_column='rejectedon_userid', blank=True, null=True)
            # rescheduledon_date = models.DateField(blank=True, null=True)
            # rescheduledon_userid = models.BigIntegerField(blank=True, null=True)
            # withdrawnon_date = models.DateField(blank=True, null=True)
            # withdrawnon_userid = models.ForeignKey(MAppuser, db_column='withdrawnon_userid', blank=True, null=True)
            # writtenoffon_date = models.DateField(blank=True, null=True)
            # loan_transaction_strategy = models.ForeignKey('RefLoanTransactionProcessingStrategy', blank=True, null=True)
            # sync_disbursement_with_meeting = models.IntegerField(blank=True, null=True)
            # loan_counter = models.IntegerField(blank=True, null=True)
            # loan_product_counter = models.IntegerField(blank=True, null=True)
            # fixed_emi_amount = models.DecimalField(max_digits=19, decimal_places=6, blank=True, null=True)
            # max_outstanding_loan_balance = models.DecimalField(max_digits=19, decimal_places=6, blank=True, null=True)
            # grace_on_arrears_ageing = models.IntegerField(blank=True, null=True)

            # non performing asset (ie: a loan thats not been paid in 90 days)
            is_npa = is_npa,
            # total_recovered_derived = models.DecimalField(max_digits=19, decimal_places=6, blank=True, null=True)
            # accrued_till = models.DateField(blank=True, null=True)

            # default values are 1
            days_in_month_enum = 1,
            days_in_year_enum = 1,
            # default value is 0
            interest_recalculation_enabled = 0,
            # guarantee_amount_derived = models.DecimalField(max_digits=19, decimal_places=6, blank=True, null=True)
            # create_standing_instruction_at_disbursement = models.IntegerField(blank=True, null=True)

            # default value is 1
            version = 1,
        )
        l.save(using='mifosx')
        # why do i need to do this again? :p
        out = mifosx.MLoan.objects.using('mifosx').get(account_no=l.account_no)
        out.account_no = "{0:09d}".format(out.id)
        out.save(using='mifosx')
        if i % 100 == 0:
            print ("Progress: {}".format(i))
    print("Migrating loans complete.")

import random
def migrate_clients():
    print("Migrating Clients")
    try:
        male = mifosx.MCodeValue.objects.using('mifosx').get(code_value='Male')
    except ObjectDoesNotExist:
        mcode = mifosx.MCode.objects.using('mifosx').get(code_name='Gender')
        male = mifosx.MCodeValue(
            code=mcode,
            code_value='Male',
            order_position=1,
        )
        male.save(using='mifosx')
    try:
        female = mifosx.MCodeValue.objects.using('mifosx').get(code_value='Female')
    except ObjectDoesNotExist:
        mcode = mifosx.MCode.objects.using('mifosx').get(code_name='Gender')
        female = mifosx.MCodeValue(
            code=mcode,
            code_value='Female',
            order_position=1,
        )
        female.save(using='mifosx')
    mam = mambu.Client.objects.using('mambu').all()
    mif = mifosx.MClient.objects.using('mifosx').all()
    if len(mam) <= len(mif):
        print("Clients already migrated. Skipping")
        return
    for i, client in enumerate(mam):
        office = mifosx.MOffice.objects.using('mifosx').get(external_id=client.assignedbranchkey.encodedkey)
        if client.gender and client.gender.lower() == "female":
            gender = female
        elif client.gender and client.gender.lower() == "male":
            gender = male
        else:
            gender = None

        if client.state and client.state.lower() == "active":
            status = mifosx.CLIENT_ACTIVE
        elif client.state and client.state.lower() == "inactive":
            status = mifosx.CLIENT_CLOSED
        else:
            status = None

        m = mifosx.MClient(
            # update account number with the ID after saving
            account_no = "{0:09d}".format(random.randrange(0,999999999)),
            external_id = client.encodedkey,
            status_enum = status,
            # sub_status = models.ForeignKey('MCodeValue', db_column='sub_status', blank=True, null=True)
            activation_date = client.activationdate,
            # office_joining_date = models.DateField(blank=True, null=True)
            office = office,
            # transfer_to_office = models.ForeignKey('MOffice', blank=True, null=True)
            # staff = models.ForeignKey('MStaff', blank=True, null=True)
            firstname = client.firstname,
            middlename = client.middlename,
            lastname = client.lastname,
            # fullname = models.CharField(max_length=100, blank=True)
            # display_name = models.CharField(max_length=100)
            mobile_no = None,
            # mobile_no = client.mobilephone1, # not all mobilephone1 are unique in Mambu, but they are unique in Mifosx
            gender_cv = gender,
            date_of_birth = client.birthdate,
            # image = models.ForeignKey('MImage', blank=True, null=True)
            # closure_reason_cv = models.ForeignKey('MCodeValue', blank=True, null=True)
            # closedon_date = models.DateField(blank=True, null=True)
            # updated_by = models.BigIntegerField(blank=True, null=True)
            # updated_on = models.DateField(blank=True, null=True)
            # submittedon_date = models.DateField(blank=True, null=True)
            # submittedon_userid = models.BigIntegerField(blank=True, null=True)
            # activatedon_userid = models.BigIntegerField(blank=True, null=True)
            # closedon_userid = models.BigIntegerField(blank=True, null=True)
            # default_savings_product = models.ForeignKey('MSavingsProduct', db_column='default_savings_product', blank=True, null=True)
            # default_savings_account = models.ForeignKey('MSavingsAccount', db_column='default_savings_account', blank=True, null=True)
            # client_type_cv = models.ForeignKey('MCodeValue', blank=True, null=True)
            # client_classification_cv = models.ForeignKey('MCodeValue', blank=True, null=True)
            # reject_reason_cv = models.ForeignKey('MCodeValue', blank=True, null=True)
            # rejectedon_date = models.DateField(blank=True, null=True)
            # rejectedon_userid = models.BigIntegerField(blank=True, null=True)
            # withdraw_reason_cv = models.ForeignKey('MCodeValue', blank=True, null=True)
            # withdrawn_on_date = models.DateField(blank=True, null=True)
            # withdraw_on_userid = models.BigIntegerField(blank=True, null=True)
            # reactivated_on_date = models.DateField(blank=True, null=True)
            # reactivated_on_userid = models.BigIntegerField(blank=True, null=True)
        )
        m.save(using='mifosx')
        # why do i need to do this again? :p
        out = mifosx.MClient.objects.using('mifosx').get(account_no=m.account_no)
        out.account_no = "{0:09d}".format(out.id)
        out.save(using='mifosx')
        if i % 100 == 0:
            print ("Progress: {}".format(i))
        # print ()
        # update_progress((i+1) / len(mam), len(mam))
    print("Migrating clients complete.")

def migrate_groups():
    print("Migrating Groups")
    mam = mambu.Group.objects.using('mambu').all()
    mif = mifosx.MGroup.objects.using('mifosx').all()
    super_parent, created = mifosx.MGroupLevel.objects.using('mifosx').get_or_create(
        parent_id=None, super_parent=1,
        defaults={
            "level_name": 'Center',
            "recursable": 1,
            "can_have_clients": 0,
        }
    )
    group_level, created = mifosx.MGroupLevel.objects.using('mifosx').get_or_create(
        parent_id=super_parent.id, super_parent=0,
        defaults={
            "level_name": 'Group',
            "recursable": 0,
            "can_have_clients": 1,
        }
    )
    if len(mam) <= len(mif):
        print("Groups already migrated. Skipping")
        return
    for i, group in enumerate(mam):
        # if group.state and group.state.lower() == "active":
        #     status = mifosx.CLIENT_ACTIVE
        # elif group.state and group.state.lower() == "inactive":
        #     status = mifosx.CLIENT_CLOSED
        # else:
        #     status = None
        status = mifosx.CLIENT_ACTIVE
        office = mifosx.MOffice.objects.using('mifosx').get(external_id=group.assignedbranchkey.encodedkey)
        g = mifosx.MGroup(
            external_id = group.encodedkey,
            # Same as client status 0=Invalid, 100=Pending, 300=Active, 600=Closed (or Exited)
            status_enum = status,
            activation_date = group.lastmodifieddate,
            office = office,
            # staff = models.ForeignKey('MStaff', blank=True, null=True),
            # parent = models.ForeignKey('self', blank=True, null=True),
            level = group_level,
            display_name = group.groupname,
            # hierarchy = models.CharField(max_length=100, blank=True),
            # closure_reason_cv = models.ForeignKey(MCodeValue, blank=True, null=True),
            # closedon_date = models.DateField(blank=True, null=True),
            # activatedon_userid = models.BigIntegerField(blank=True, null=True),
            # submittedon_date = models.DateField(blank=True, null=True),
            # submittedon_userid = models.BigIntegerField(blank=True, null=True),
            # closedon_userid = models.BigIntegerField(blank=True, null=True),
        )
        try :
            g.save(using='mifosx')
        except Exception as e:
            g.display_name += "{0:09d}".format(random.randrange(0,999999999))
            g.save(using='mifosx')
        if i % 100 == 0:
            print ("Progress: {}".format(i))
    print("Migrating groups complete.")

def migrate_group_client():
    print("Migrating Groups")
    from django.db import connections
    with connections['mifosx'].cursor() as cursor:
        cursor.execute("select * from m_group_client")
        mif = list(cursor.fetchall())
    mam = mambu.Groupmember.objects.using('mambu').all()
    if len(mam) <= len(mif):
        print("Groups already migrated. Skipping")
        return
    for i, group in enumerate(mam):
        grp = mifosx.MGroup.objects.using('mifosx').get(external_id=group.groupkey.encodedkey)
        cli = mifosx.MClient.objects.using('mifosx').get(external_id=group.clientkey.encodedkey)
        with connections['mifosx'].cursor() as cursor:
            cursor.execute("INSERT INTO m_group_client VALUES (%s, %s)",
                           [grp.pk, cli.pk]
                           )
        if i % 100 == 0:
            print ("Progress: {}".format(i))
    print("Migrating groups complete.")

if __name__ == "__main__":
    # migrate_branch()
    # migrate_clients()
    # migrate_loanproduct()
    # migrate_groups()
    # migrate_group_client()
    migrate_loans()