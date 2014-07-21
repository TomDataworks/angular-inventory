from django.test import TestCase

# Create your tests here.

from django.test import TestCase
from inventory.models import Item
from rest_framework.test import APIRequestFactory

factory = APIRequestFactory()
# user = User.objects.get(username='arven')
# view = Inventory.as_view()

class InventoryItemTestCase(TestCase):
    def setUp(self):
        Item.objects.create(itemId="product-a", name="Product A", count=12, short="Test product description", desc="Test product long description")

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
        request = factory.post('/django/inventory/', {'fields': {'itemId': 'product-b', 'name': 'Product B', 'count':12, 'short': 'Test product description 2', 'desc': 'Test product long description 2'}}, format='json')
        product_b = Item.objects.filter(itemId="product-b")
        self.assertFalse(product_b.exists())

    # Now we try to update an item, but don't authenticate ourselves. Thus, we
    # should get the initial item
    def test_inventory_update_item_unauthenticated(self):
        """Inventory items not updated when we are not authenticated"""
        request = factory.post('/django/inventory/product-a', {'fields': {'itemId': 'product-a', 'name': 'Product A', 'count':120, 'short': 'Test product description', 'desc': 'Test product long description'}}, format='json')
        product_a = Item.objects.filter(itemId="product-a")
        self.assertTrue(product_a.exists())
        first = product_a[0]
        self.assertEqual(first.count, 12)

    # Now we try to delete an item, but don't authenticate ourselves. Thus, we
    # should get the initial item
    def test_inventory_delete_item_unauthenticated(self):
        """Inventory items not deleted when we are not authenticated"""
        request = factory.delete('/django/inventory/product-a')
        product_a = Item.objects.filter(itemId="product-a")
        self.assertTrue(product_a.exists())
