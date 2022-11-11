from rest_framework import serializers
from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = (
            "employee_id",
            "first_name",
            "last_name",
            "contact_number",
            "email",
            "date_of_birth",
            "street_name",
            "city",
            "postal_code",
            "country"
        )
