from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer

# Create your views here.

def product_list(request):
    products = Product.objects.filter(available=True)
    return render(request, 'index.html', {products: Product})

def product_details(request, pk):
    product = get_object_or_404(Product, pk=pk)
    return render(request, 'index.html',{product: Product})


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer