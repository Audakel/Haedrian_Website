from django.contrib.auth.decorators import permission_required
from django.shortcuts import render
import time
from datetime import datetime
from apiv1.models import TransactionQueue, VerifyGroup


def index(request, page=''):
    # TODO: add actual pages for each of these
    if page == '':
        page = 'index.html'
    return render(request, 'dashboard/%s' %page)

@permission_required("is_superuser")
def admin_dashboard(request):
    """
    multibarchart page
    """
    transaction_queue = TransactionQueue.objects.filter(status=TransactionQueue.PENDING)
    group_queue = VerifyGroup.objects.filter(status=VerifyGroup.PENDING)
    nb_element = 10
    xdata = range(nb_element)
    start_time = int(time.mktime(datetime.utcnow().timetuple()) * 1000)
    xdata = map(lambda x: start_time + x * 1000000000, xdata)
    ydata = [len(transaction_queue)]
    ydata2 = [len(group_queue)]

    extra_serie = {"tooltip": {"y_start": "There are ", "y_end": " transactions in the queue"}}
    extra_serie2 = {"tooltip": {"y_start": "There are ", "y_end": " buy orders in the queue"}}

    chartdata = {
        'x': xdata,
        'name1': 'Transactions', 'y1': ydata, 'extra1': extra_serie,
        'name2': 'Buy Orders', 'y2': ydata2, 'extra2': extra_serie2
    }

    charttype = "multiBarChart"
    chartcontainer = 'multibarchart_container'  # container name
    data = {
        'charttype': charttype,
        'chartdata': chartdata,
        'chartcontainer': chartcontainer,
        'extra': {
            'x_is_date': True,
            'x_axis_format': '%d %b %Y',
            'tag_script_js': True,
            'jquery_on_ready': True,
        },
    }
    return render(request, 'dashboard.html', data)
