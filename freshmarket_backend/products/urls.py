from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('', views.product_list, name='product_list'),
    path('<int:pk>/', views.product_details, name='product_details'),
]