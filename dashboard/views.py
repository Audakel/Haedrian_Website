from django.shortcuts import render

def index(request, page=''):
    # TODO: add actual pages for each of these
    if page == '':
        page = 'index.html'
    return render(request, 'dashboard/%s' %page)
