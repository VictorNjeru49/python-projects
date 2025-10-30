from django.test import TestCase
from .models import Product, Category

# Create your tests here.
class ProductModelTest(TestCase):
    def setUp(self):
        category = Category.objects.create(name="Fruits")
        Product.objects.create(name="Apple", category=category, price=50)

    def test_product_name(self):
        apple = Product.objects.get(name="Apple")
        self.assertEqual(apple.name, "Apple")