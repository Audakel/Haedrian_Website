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
    context["count"] = BetaApplicant.objects.count()
    return render(request, 'index.html', context)

# def

def graph(request):
    return render(request, 'graphs/stockGraph.html')

def graph1(request):
    return render(request, 'graphs/bundleGraph.html')

def graph2(request):    
    return render(request, 'graphs/pieGraph.html')