from django.urls import path
from . import views

urlpatterns = [
    path(route='employees/api/', view=views.employees_list, name='employee_list'),
    path(route='employees/api/<slug:employee_id>', view=views.employees_detail, name='employee_detail'),
]
