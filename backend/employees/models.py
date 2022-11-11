from django.db import models
from .constants import SENIORITY_RATING_CHOICES, EXPERIENCE_LEVEL_CHOICES
from .services import generate_employee_id


class Employee(models.Model):
    # Personal Info
    employee_id = models.CharField(unique=True, max_length=6)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=20)
    email = models.EmailField()
    date_of_birth = models.DateField()

    # Address Info
    street_name = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    postal_code = models.PositiveIntegerField(null=True, )
    country = models.CharField(max_length=255)

    objects = models.Manager()

    def __str__(self):
        return self.employee_id

    def save(self, *args, **kwargs):
        if self.employee_id is None \
                or self.employee_id == Employee._meta.get_field('employee_id').get_default():
            found = True
            while found is True:
                new_id = generate_employee_id()
                try:
                    Employee.objects.get(employee_id=new_id)
                except Employee.DoesNotExist:
                    found = False
            self.employee_id = new_id
        super(Employee, self).save(*args, **kwargs)


class Skill(models.Model):
    name = models.CharField(max_length=255)
    years_experience = models.CharField(
        choices=EXPERIENCE_LEVEL_CHOICES,
        max_length=255
    )
    seniority_rating = models.CharField(
        choices=SENIORITY_RATING_CHOICES,
        max_length=255
    )
    employee = models.ForeignKey(Employee, to_field='employee_id', on_delete=models.CASCADE)

