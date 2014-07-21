from django.db import models

# Create your models here.

# Item class for our inventory, contains item id,
# name, count of items, short description, and
# long description. Can convert to string solely
# for testing in the management shell
class Item(models.Model):
	itemId = models.CharField(max_length=200)
	name = models.CharField(max_length=200)
	count = models.IntegerField()
	short = models.CharField(max_length=200)
	desc = models.TextField()
	def __str__(self):
		return self.name
