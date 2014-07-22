from django.test import TestCase

# Create your tests here.

from django.test import TestCase
from inventory.models import Item
from rest_framework.test import APIRequestFactory
from rest_framework.test import APIClient
from django.contrib.auth.models import User
import json

# This test case ensures that inventory items are added to the database properly, that they
# are not when the user is not authenticated, and that data can be read from the database.
class InventoryItemTestCase(TestCase):
    def setUp(self):
        Item.objects.create(itemId="product-a", name="Product A", count=12, short="Test product description", desc="Test product long description")
        self.user = User.objects.create_user(username='arven', email='arven@localhost.localdomain.com', password='testing')
        self.client = APIClient()

    # Here we test a pre-created object that was set up in the startup of
    # the test case. It's quite trivial, as it's really just variable names,
    # but there is zero functionality of the class other than to store data.
    def test_inventory_product_values(self):
        """Inventory items correctly match the set descriptions"""
        product_a = Item.objects.get(itemId="product-a")
        self.assertEqual(product_a.itemId, "product-a")
        self.assertEqual(product_a.name, "Product A")
        self.assertEqual(product_a.count, 12)
        self.assertEqual(product_a.short, "Test product description")
        self.assertEqual(product_a.desc, "Test product long description")

    # Now we try to add an item, but don't authenticate ourselves. Thus, we
    # should get an empty result set.
    def test_inventory_add_item_unauthenticated(self):
        """Inventory items not added when we are not authenticated"""
        self.client.post('/django/inventory/', {'fields': {'itemId': 'product-b', 'name': 'Product B', 'count':12, 'short': 'Test product description 2', 'desc': 'Test product long description 2'}}, format='json')
        product_b = Item.objects.filter(itemId="product-b")
        self.assertFalse(product_b.exists())

    # Now we try to update an item, but don't authenticate ourselves. Thus, we
    # should get the initial item
    def test_inventory_update_item_unauthenticated(self):
        """Inventory items not updated when we are not authenticated"""
        self.client.post('/django/inventory/product-a', {'fields': {'itemId': 'product-a', 'name': 'Product A', 'count':120, 'short': 'Test product description', 'desc': 'Test product long description'}}, format='json')
        product_a = Item.objects.filter(itemId="product-a")
        self.assertTrue(product_a.exists())
        first = product_a[0]
        self.assertEqual(first.count, 12)

    # Now we try to delete an item, but don't authenticate ourselves. Thus, we
    # should get the initial item.
    def test_inventory_delete_item_unauthenticated(self):
        """Inventory items not deleted when we are not authenticated"""
        self.client.delete('/django/inventory/product-a')
        product_a = Item.objects.filter(itemId="product-a")
        self.assertTrue(product_a.exists())

    # Now we try to add an item, and do authenticate ourselves.
    def test_inventory_add_item_authenticated(self):
        """Inventory items added when we are authenticated"""
        self.client.login(username='arven', password='testing')
        self.client.post('/django/inventory/', {'fields': {'itemId': 'product-b', 'name': 'Product B', 'count':12, 'short': 'Test product description 2', 'desc': 'Test product long description 2'}}, format='json')
        product_b = Item.objects.filter(itemId="product-b")
        self.assertTrue(product_b.exists())
        self.client.logout()

    # Now we try to update an item, and do authenticate ourselves.
    def test_inventory_update_item_authenticated(self):
        """Inventory items updated when we are authenticated"""
        Item.objects.create(itemId="product-b", name="Product B", count=12, short="Test product description", desc="Test product long description")
        self.client.login(username='arven', password='testing')
        self.client.post('/django/inventory/', {'fields': {'itemId': 'product-b', 'name': 'Product B', 'count':120, 'short': 'Test product description', 'desc': 'Test product long description'}}, format='json')
        product_b = Item.objects.filter(itemId="product-b")
        self.assertTrue(product_b.exists())
        first = product_b[0]
        self.assertEqual(first.count, 120)
        self.client.logout()

    # Now we try to delete an item, and do authenticate ourselves.
    def test_inventory_delete_item_authenticated(self):
        """Inventory items deleted when we are authenticated"""
        self.client.login(username='arven', password='testing')
        self.client.delete('/django/inventory/product-b')
        product_a = Item.objects.filter(itemId="product-b")
        self.assertFalse(product_a.exists())
        self.client.logout()

    # We want to test the index service twice
    def test_index_service_2_items(self):
        """We should have two items in index"""
        Item.objects.create(itemId="product-b", name="Product B", count=12, short="Test product description", desc="Test product long description")
        response = self.client.get('/django/inventory/')
        rry = json.loads(response.content.decode())
        self.assertEqual(len(rry), 2)

    # Test the index service without adding anything
    def test_index_service_1_item(self):
        """We should have one item in index"""
        response = self.client.get('/django/inventory/')
        rry = json.loads(response.content.decode())
        self.assertEqual(len(rry), 1)

    # We want to test the product lookup twice, because of
    # potentially not really looking at the item id
    def test_product_description_service(self):
        """We should be able to the item in the test database"""
        response = self.client.get('/django/inventory/product-a/')
        rry = json.loads(response.content.decode())
        self.assertEqual(len(rry), 1)
        self.assertEqual(rry[0]['fields']['itemId'], 'product-a')

    # We want to test the product lookup twice, because of
    # potentially not really looking at the item id
    def test_product_description_service_multiple_items(self):
        """We should be able to query both items in the test database"""
        Item.objects.create(itemId="product-b", name="Product B", count=12, short="Test product description", desc="Test product long description")
        response = self.client.get('/django/inventory/product-b/')
        rry = json.loads(response.content.decode())
        self.assertEqual(len(rry), 1)
        self.assertEqual(rry[0]['fields']['itemId'], 'product-b')
