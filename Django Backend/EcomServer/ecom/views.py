from django.core.mail import BadHeaderError, send_mail

from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import api_view

from drf_spectacular.utils import extend_schema

from .serializer import UserSerializer, ProductSerializer, EmailSerializer
from .models import User, Product

import os
from dotenv import load_dotenv

load_dotenv()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


@extend_schema(
    request=EmailSerializer,
    responses={200: "Message sent successfully.", 400: "Invalid input."},
)
@api_view(["POST"])
def send_email(request):
    print(request.data)
    serializer = EmailSerializer(data=request.data)
    if serializer.is_valid():
        message = serializer.validated_data["message"]
        from_email = serializer.validated_data["from_email"]
        try:
            send_mail(
                "User Feedback",
                message,
                os.getenv("EMAIL_HOST_USER"),
                [from_email],
                fail_silently=False,
            )
        except BadHeaderError:
            return Response(
                {"error": "Invalid header found."}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(
            {"message": "Message sent successfully."}, status=status.HTTP_200_OK
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

