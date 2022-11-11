import datetime
from django.test import TestCase
from ..models import Employee


class ModelTests(TestCase):
    def setUp(self):
        self.test_employee = Employee.objects.get_or_create(
            first_name="Test1",
            last_name="Test1",
            contact_number="0000000000",
            email="test@test.com",
            date_of_birth=datetime.date.today(),
            street_name="Test1",
            city="Test1",
            postal_code=1,
            country="Test1"
        )[0]

    def test_to_string(self):
        self.assertEqual(self.test_employee.__str__(), self.test_employee.employee_id)
