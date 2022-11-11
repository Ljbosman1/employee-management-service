from django.db import models, IntegrityError
from .services import generate_employee_id


class Employee(models.Model):
    # Personal Info
    employee_id = models.CharField(unique=True, blank=True, null=True, max_length=6)
    first_name = models.CharField(blank=True, null=True, max_length=255)
    last_name = models.CharField(blank=True, null=True, max_length=255)
    contact_number = models.CharField(blank=True, null=True, max_length=20)
    email = models.EmailField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)

    # Address Info
    street_name = models.CharField(blank=True, null=True, max_length=255)
    city = models.CharField(blank=True, null=True, max_length=255)
    postal_code = models.PositiveIntegerField(blank=True, null=True, )
    country = models.CharField(blank=True, null=True, max_length=255)

    objects = models.Manager()

    def __str__(self):
        return self.employee_id

    def save(self, *args, **kwargs):
        if self.employee_id is None:
            found = True
            while found is True:
                new_id = generate_employee_id()
                try:
                    Employee.objects.get(employee_id=new_id)
                except Employee.DoesNotExist:
                    found = False
            self.employee_id = new_id
        super(Employee, self).save(*args, **kwargs)
