from django.shortcuts import render
from django.core import serializers
from inventory.models import Item
from decimal import Decimal
import json
from django.utils import simplejson

# Create your views here.
from django.http import HttpResponse
from inventory.models import Item

def index(request):
    if request.method == 'GET':
        list_of_items = Item.objects.all()
        data = serializers.serialize("json", list_of_items)
        return HttpResponse(data, content_type="application/json")
    if request.method == 'POST':
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

def detail(request, item_id):
    if request.method == 'GET':
        item = Item.objects.filter(itemId=item_id)
        data = serializers.serialize("json", item)
        return HttpResponse(data, content_type="application/json")
    if request.method == 'DELETE':
        Item.objects.filter(itemId=item_id).delete()
        return HttpResponse({}, content_type="application/json")
