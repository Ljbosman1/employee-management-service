from django.urls import path
from . import views

urlpatterns = [
    path(route='employees/api/', view=views.employees_list, name='employee_list'),
    path(route='employees/api/<slug:employee_id>', view=views.employee_detail, name='employee_detail'),
    path(route='skills/api/', view=views.skills_list, name='skill_list'),
    path(route='skills/api/<slug:pk>', view=views.skill_detail, name='skill_detail'),
    path(route='skill/data/api/', view=views.skill_dropdown_data, name='skill_data'),
]
