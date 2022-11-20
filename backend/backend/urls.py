from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="Employee Management Service API",
        default_version='v1',
        description="Manage Employees",
        contact=openapi.Contact(email="deon@tangentsolutions.co.za"),
    ),
    # url=f'{settings.APP_URL}/api/v3/',
    patterns=[path("", include(('employees.urls', 'employees'), namespace='employees')),],
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(('employees.urls', 'employees'), namespace='employees')),
    # OpenAPI 3 documentation with Swagger UI
    path(
        'swagger-ui/',
        TemplateView.as_view(
            template_name='swagger-ui.html',
            extra_context={'schema_url': 'openapi-schema'}
        ),
        name='swagger-ui'),
    re_path(  # new
        r'^swagger(?P<format>\.json|\.yaml)$',
        schema_view.without_ui(cache_timeout=0),
        name='schema-json'
    )
]
