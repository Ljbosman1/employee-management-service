from django.urls import path
from . import views

urlpatterns = [
    path(route='employees/api/', view=views.EmployeesListView.as_view(), name='employee_list'),
    path(route='employees/api/<slug:employee_id>', view=views.EmployeesDetailView.as_view(), name='employee_detail'),
    path(route='skills/api/', view=views.SkillsListView.as_view(), name='skill_list'),
    path(route='skill/data/api/', view=views.skill_dropdown_data, name='skill_data'),
]
