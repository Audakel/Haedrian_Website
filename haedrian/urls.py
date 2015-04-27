from django.conf.urls import patterns, url

from haedrian import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^graph$', views.graph, name='graph'),
    url(r'^graph1$', views.graph1, name='graph1'),
	url(r'^graph2$', views.graph2, name='graph2'),
)
