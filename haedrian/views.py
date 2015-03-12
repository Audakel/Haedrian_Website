from django.shortcuts import render

from haedrian.forms import BetaApplicantForm
from haedrian.models import BetaApplicant

# Create your views here.
def index(request):
    if (request.POST):
        pass
    else:
        pass
    form = BetaApplicantForm()
    context = {
        "form": form
    }
    return render(request, 'index.html', context)