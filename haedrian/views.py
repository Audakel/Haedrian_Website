from django.shortcuts import render

from haedrian.forms import BetaApplicantForm
from haedrian.models import BetaApplicant

# Create your views here.
def index(request):

    return render(request, 'index.html')