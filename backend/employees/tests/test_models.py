import json
from django.test import TestCase
from ..models import Employee


class ModelTests(TestCase):
    def setUp(self):
        self.test_employee = Employee.objects.get_or_create(first_name="Test1")[0]

    def test_to_string(self):
        self.assertEqual(self.test_employee.__str__(), self.test_employee.employee_id)
