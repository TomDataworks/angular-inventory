from django.conf.urls import patterns, include, url
from django.contrib import admin
from accounts import views as views
from rest_framework import routers

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'django_inventory.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # Inventory index and inventory detail view, works for get and post
    url(r'^django/inventory/$', 'inventory.views.index'),
    url(r'^django/inventory/(?P<item_id>[a-zA-Z0-9-]+)/$', 'inventory.views.detail'),

    # Accounts system has three parts, one for user management, another
    # for login management, and another just to allow web client to check
    # the login
    # url(r'^django/accounts/users/$', views.UserView.as_view({'get': 'list', 'post': 'create'})),
    url(r'^django/accounts/auth/$', views.AuthView.as_view(), name='authenticate'),
    url(r'^django/accounts/checklogin/$', 'accounts.views.checklogin'),

    # Administration URL, not required except to add user accounts.
    url(r'^django/admin/', include(admin.site.urls)),
)
