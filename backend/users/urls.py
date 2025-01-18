from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from .views import UserViewSet
from .views import RegisterView,ProtectedView

router = DefaultRouter()
# router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),  
    path('register/', RegisterView.as_view(), name='register'),
    path('protected/', ProtectedView.as_view(), name='protected'),

]
