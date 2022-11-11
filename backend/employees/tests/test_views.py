import datetime
import json
from django.test import TestCase
from django.urls import reverse
from ..constants import SENIORITY_RATING_CHOICES, EXPERIENCE_LEVEL_CHOICES
from ..models import Employee, Skill


class EmployeeViewTests(TestCase):
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
        Employee.objects.get_or_create(
            first_name="Test2",
            last_name="Test2",
            contact_number="0000000000",
            email="test@test.com",
            date_of_birth=datetime.date.today(),
            street_name="Test2",
            city="Test2",
            postal_code=2,
            country="Test2"
        )
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
            'last_name': self.test_employee.last_name,
            'contact_number': self.test_employee.contact_number,
            'email': self.test_employee.email,
            'date_of_birth': self.test_employee.date_of_birth.strftime("%Y-%m-%d"),
            'street_name': self.test_employee.street_name,
            'city': self.test_employee.city,
            'postal_code': self.test_employee.postal_code,
            'country': self.test_employee.country,
        }
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data, employee)

    def test_invalid_detail(self):
        response = self.client.get(self.invalid_read_url)
        self.assertEqual(response.status_code, 404)

    def test_create(self):
        post = {
            "first_name": "Test3",
            "last_name": "Test3",
            "contact_number": "0000000000",
            "email": "test@test.com",
            "date_of_birth": datetime.date.today(),
            "street_name": "Test3",
            "city": "Test1",
            "postal_code": 3,
            "country": "Test3"
        }

        response = self.client.post(self.employee_list_url, post)
        self.assertContains(response, "Test3", status_code=201)
        self.assertEqual(Employee.objects.count(), 3)

    def test_invalid_create(self):
        post = {
            "first_name": "Test3",
            "last_name": "Test3",
            "contact_number": "0000000000",
            "email": "test@test.com",
            "date_of_birth": datetime.date.today(),
            "street_name": "Test3",
            "city": "Test1",
            "postal_code": -3,
            "country": "Test3"
        }

        response = self.client.post(self.employee_list_url, post)
        self.assertEqual(response.status_code, 400)

    def test_delete(self):
        response = self.client.delete(self.employee_url)

        self.assertEqual(response.status_code, 204)
        self.assertEqual(Employee.objects.count(), 1)

    def test_update(self):
        payload = {
                "first_name": "Test3",
                "last_name": "Test3",
                "contact_number": "0000000000",
                "email": "test@test.com",
                "date_of_birth": self.test_employee.date_of_birth.strftime("%Y-%m-%d"),
                "street_name": "Test3",
                "city": "Test1",
                "postal_code": 3,
                "country": "Test3"
            }

        response = self.client.put(
            self.employee_url,
            data=json.dumps(payload),
            content_type='application/json'
        )
        payload['employee_id'] = self.test_employee.employee_id
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), payload)
        self.assertEqual(Employee.objects.count(), 2)

    def test_invalid_update(self):
        payload = json.dumps({"postal_code": -1})
        response = self.client.put(
            self.employee_url,
            data=payload,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)


class SkillViewTests(TestCase):
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
        self.test_skill = Skill.objects.get_or_create(
            name="Test1",
            years_experience=EXPERIENCE_LEVEL_CHOICES[0][0],
            seniority_rating=SENIORITY_RATING_CHOICES[0][0],
            employee=self.test_employee
        )[0]
        Skill.objects.get_or_create(
            name="Test2",
            years_experience=EXPERIENCE_LEVEL_CHOICES[0][0],
            seniority_rating=SENIORITY_RATING_CHOICES[0][0],
            employee=self.test_employee
        )
        self.skill_list_url = reverse('employees:skill_list')
        self.skill_data_url = reverse('employees:skill_data')
        self.skill_url = reverse(
            'employees:skill_detail',
            kwargs={'pk': self.test_skill.pk}
        )
        self.invalid_read_url = reverse(
            'employees:skill_detail',
            kwargs={'pk': -1}
        )

    def test_list(self):
        response = self.client.get(self.skill_list_url)

        self.assertContains(response, 'Test1')
        self.assertContains(response, 'Test2')

    def test_detail(self):
        response = self.client.get(self.skill_url)
        data = json.loads(response.content)
        skill = {
            'name': self.test_skill.name,
            'years_experience': self.test_skill.years_experience,
            'seniority_rating': self.test_skill.seniority_rating,
            'employee_id': self.test_employee.employee_id,
        }
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data, skill)

    def test_invalid_detail(self):
        response = self.client.get(self.invalid_read_url)
        self.assertEqual(response.status_code, 404)

    def test_create(self):
        post = {
            "name": "Test3",
            "years_experience": self.test_skill.years_experience,
            "seniority_rating": self.test_skill.seniority_rating,
            "employee_id": self.test_employee.employee_id,
        }

        response = self.client.post(self.skill_list_url, post)
        self.assertContains(response, "Test3", status_code=201)
        self.assertEqual(Skill.objects.count(), 3)

    def test_invalid_create(self):
        post = {
            "name": "Test3",
            "years_experience": "invalid_experience",
            "seniority_rating": self.test_skill.seniority_rating,
            "employee_id": self.test_employee.employee_id,
        }

        response = self.client.post(self.skill_list_url, post)
        self.assertEqual(response.status_code, 400)

    def test_update(self):
        payload = {
            "name": "Test3",
            "years_experience": self.test_skill.years_experience,
            "seniority_rating": self.test_skill.seniority_rating,
            "employee_id": self.test_employee.employee_id,
        }

        response = self.client.put(
            self.skill_url,
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), payload)
        self.assertEqual(Skill.objects.count(), 2)

    def test_invalid_update(self):
        payload = {
            "name": "Test3",
            "years_experience": "invalid_experience",
            "seniority_rating": self.test_skill.seniority_rating,
            "employee_id": self.test_employee.employee_id,
        }
        response = self.client.put(
            self.skill_url,
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)

    def test_delete(self):
        response = self.client.delete(self.skill_url)

        self.assertEqual(response.status_code, 204)
        self.assertEqual(Skill.objects.count(), 1)

    def test_skill_data(self):
        response = self.client.get(self.skill_data_url)

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'seniority_levels')
        self.assertContains(response, 'experience_levels')
