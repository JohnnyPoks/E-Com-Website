from rest_framework import serializers
from rest_framework_mongoengine.serializers import DocumentSerializer

from .models import Product, User


class UserSerializer(DocumentSerializer):
    class Meta:
        model = User
        fields = "__all__"
        # exclude = ['__v']
        # depth = 1


class ProductSerializer(DocumentSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        # exclude = ['__v']
        # depth = 1


class EmailSerializer(serializers.Serializer):
    message = serializers.CharField()
    from_email = serializers.EmailField()
