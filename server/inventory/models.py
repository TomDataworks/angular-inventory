from django.db import models

# Create your models here.
class Item(models.Model):
	itemId = models.CharField(max_length=200)
	name = models.CharField(max_length=200)
	count = models.IntegerField()
	short = models.CharField(max_length=200)
	desc = models.TextField()
	def __str__(self):
		return self.name
