from django.shortcuts import render
from django.core import serializers
from django.middleware.csrf import get_token
from inventory.models import Item
import json

# Create your views here.
from django.http import HttpResponse
from inventory.models import Item

def index(request):
    csrf_token = get_token(request)
    list_of_items = Item.objects.all()
    data = serializers.serialize("json", list_of_items)
    return HttpResponse(data, content_type="application/json")

def detail(request, item_id):
    item = Item.objects.filter(itemId=item_id)
    data = serializers.serialize("json", item)
    return HttpResponse(data, content_type="application/json")

def updatecount(request, item_id, new_item_count):
    items = Item.objects.filter(itemId=item_id)
    for o in items:
        o.count = new_item_count
        o.save()
    return HttpResponse([], content_type="application/json")

def delete(request, item_id):
    Item.objects.filter(itemId=item_id).delete()
    return HttpResponse([], content_type="application/json")

def create(request):
    if request.method == 'POST':
        item = Item(itemId=request.POST['itemId'],count=request.POST['count'],name=request.POST['name'],short=request.POST['short'],desc=request.POST['desc'])
        item.save()
    return HttpResponse("Inventory item added.", content_type="text/plain")
