from django.shortcuts import render
from django.core import serializers
from inventory.models import Item
from decimal import Decimal
import json
from django.utils import simplejson

# Create your views here.
from django.http import HttpResponse
from inventory.models import Item

# This is the main index, which can both be used to get the list
# of items, or be used to post new items
def index(request):
    # GET is simple, and just queries the database and dumps out
    # the results
    if request.method == 'GET':
        list_of_items = Item.objects.all()
        data = serializers.serialize("json", list_of_items)
        return HttpResponse(data, content_type="application/json")
    # POST requires a bit of authentication and some logic to
    # determine if we are going to be adding a new item or just
    # updating an old one
    if request.method == 'POST':
        if request.user.username:
            data = simplejson.loads(request.body.decode(), parse_float=Decimal)['fields']
            items = Item.objects.filter(itemId=data['itemId'])
            if items:
                for o in items:
                    o.count = data['count']
                    o.save()
            else:
                item = Item(itemId=data['itemId'], count=data['count'], name=data['name'], short=data['short'], desc=data['desc'])
                item.save()
            return HttpResponse({}, content_type="application/json")
        else:
            # Of course, make sure to notify the user that a login is
            # required to post items or change them
            return HttpResponse('Unauthorized', status=401)

# This is the detailed view, both used for getting more information
# about a specific product, or deleting an entry
def detail(request, item_id):
    # GET is fairly simple, just search and serialize straight to the
    # client
    if request.method == 'GET':
        item = Item.objects.filter(itemId=item_id)
        data = serializers.serialize("json", item)
        return HttpResponse(data, content_type="application/json")
    # DELETE is also trivial, just delete the QuerySet outright and
    # return nothing.
    if request.method == 'DELETE':
        if request.user.username:
            Item.objects.filter(itemId=item_id).delete()
            return HttpResponse({}, content_type="application/json")
        # Of course, make sure to send a response telling the user that
        # login is required
        else:
            return HttpResponse('Unauthorized', status=401)
