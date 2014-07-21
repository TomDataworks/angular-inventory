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
