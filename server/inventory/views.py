from django.shortcuts import render
from django.core import serializers
from inventory.models import Item
import json

# Create your views here.
from django.http import HttpResponse
from inventory.models import Item

def index(request):
    list_of_items = Item.objects.all()
    data = serializers.serialize("json", list_of_items)
    return HttpResponse(data, content_type="application/json")

def detail(request, item_id):
    item = Item.objects.filter(itemId=item_id)
    data = serializers.serialize("json", item)
    return HttpResponse(data, content_type="application/json")

def update(request):
    if request.method == 'POST':
        item = Item.objects.filter(itemId=request.POST['itemId'])
        for o in items:
            o.count = request.POST['count']
            o.save()
    return HttpResponse("Inventory item updated.", content_type="text/plain")

def delete(request, item_id):
    Item.objects.filter(itemId=item_id).delete()
    return HttpResponse([], content_type="application/json")

def create(request):
    if request.method == 'POST':
        item = Item(itemId=request.POST['itemId'],count=request.POST['count'],name=request.POST['name'],short=request.POST['short'],desc=request.POST['desc'])
        item.save()
    return HttpResponse("Inventory item added.", content_type="text/plain")
