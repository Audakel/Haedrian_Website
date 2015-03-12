from django.shortcuts import render

from haedrian.forms import BetaApplicantForm
from haedrian.models import BetaApplicant

def index(request):
    context = {}
    if request.method == 'POST':
        form = BetaApplicantForm(request.POST)
        if form.is_valid():
            form.save()
            form = BetaApplicantForm()
            context['thanks'] = "Thank you for your interest! We will contact you with further information when we are ready"
    else:
        form = BetaApplicantForm()
    context["form"] = form
    import pdb; pdb.set_trace()
    context["count"] = BetaApplicant.objects.count()
    return render(request, 'index.html', context)