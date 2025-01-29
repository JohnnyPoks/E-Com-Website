from django.contrib import admin
from django.urls import path, include

from rest_framework import routers
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    # SpectacularRedocView,
)

from ecom import views

router = routers.DefaultRouter(trailing_slash=False)
router.register(r"users", views.UserViewSet, basename="user")
router.register(r"products", views.ProductViewSet, basename="product")

urlpatterns = [
    path("admin", admin.site.urls),
    path("api", include(router.urls)),
    path("api/contact", views.send_email, name="contact"),
    # MY PATTERNS
    path("api/schema", SpectacularAPIView.as_view(), name="schema"),
    # Optional UI:
    path(
        "api/schema/swagger-ui",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    # path(
    #     "api/schema/redoc/",
    #     SpectacularRedocView.as_view(url_name="schema"),
    #     name="redoc",
    # ),
]
