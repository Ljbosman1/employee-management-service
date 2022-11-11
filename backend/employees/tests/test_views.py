import json
from django.test import TestCase
from django.urls import reverse
from ..models import Employee


class DjangoRestFrameworkTests(TestCase):
    def setUp(self):
        self.test_employee = Employee.objects.get_or_create(first_name="Test1")[0]
        Employee.objects.get_or_create(first_name="Test2")
        self.employee_list_url = reverse('employees:employee_list')
        self.employee_url = reverse(
            'employees:employee_detail',
            kwargs={'employee_id': self.test_employee.employee_id}
        )
        self.invalid_read_url = reverse(
            'employees:employee_detail',
            kwargs={'employee_id': "test"}
        )

    def test_list(self):
        response = self.client.get(self.employee_list_url)

        self.assertContains(response, 'Test1')
        self.assertContains(response, 'Test2')

    def test_detail(self):
        response = self.client.get(self.employee_url)
        data = json.loads(response.content)
        employee = {
            'employee_id': self.test_employee.employee_id,
            'first_name': self.test_employee.first_name,
            'last_name': None,
            'contact_number': None,
            'email': None,
            'date_of_birth': None,
            'street_name': None,
            'city': None,
            'postal_code': None,
            'country': None
        }
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data, employee)

    def test_invalid_detail(self):
        response = self.client.get(self.invalid_read_url)
        self.assertEqual(response.status_code, 404)

    def test_create(self):
        post = {"first_name": "Test3", "last_name": "Test3"}

        response = self.client.post(self.employee_list_url, post)
        self.assertContains(response, "Test3", status_code=201)
        self.assertEqual(Employee.objects.count(), 3)

    def test_delete(self):
        response = self.client.delete(self.employee_url)

        self.assertEqual(response.status_code, 204)
        self.assertEqual(Employee.objects.count(), 1)

    def test_update(self):
        payload = json.dumps({"first_name": "Test3", "last_name": "Test3"})
        response = self.client.put(
            self.employee_url,
            data=payload,
            content_type='application/json'
        )
        employee = {
            'employee_id': self.test_employee.employee_id,
            'first_name': "Test3",
            'last_name': "Test3",
            'contact_number': None,
            'email': None,
            'date_of_birth': None,
            'street_name': None,
            'city': None,
            'postal_code': None,
            'country': None
        }
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), employee)
        self.assertEqual(Employee.objects.count(), 2)

    def test_invalid_update(self):
        payload = json.dumps({"postal_code": -1})
        response = self.client.put(
            self.employee_url,
            data=payload,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)

