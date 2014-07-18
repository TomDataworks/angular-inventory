from django.conf.urls import patterns, include, url
from django.contrib import admin

from accounts import views as views

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'django_inventory.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^django/inventory/$', 'inventory.views.index'),
    url(r'^django/inventory/(?P<item_id>[a-zA-Z0-9-]+)/$', 'inventory.views.detail'),
    url(r'^django/update/inventory/(?P<item_id>[a-zA-Z0-9-]+)/(?P<new_item_count>\d+)/$', 'inventory.views.updatecount'),
    url(r'^django/delete/inventory/(?P<item_id>[a-zA-Z0-9-]+)/$', 'inventory.views.delete'),
    url(r'^django/create/inventory/$', 'inventory.views.create'),
    url(r'^django/accounts/users/$', views.UserView.as_view({'get': 'list', 'post': 'create'})),
    url(r'^django/accounts/auth/$', views.AuthView.as_view(), name='authenticate'),
    url(r'^django/admin/', include(admin.site.urls)),
)
