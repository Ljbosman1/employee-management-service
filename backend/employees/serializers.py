from abc import ABC

from rest_framework import serializers
from .models import Employee, Skill


class EmployeeRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = (
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


class EmployeeResponseSerializer(serializers.ModelSerializer):
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


class SkillSerializer(serializers.ModelSerializer):
    employee_id = serializers.CharField()

    class Meta:
        model = Skill
        fields = (
            "employee_id",
            "name",
            "years_experience",
            "seniority_rating",
        )


class SkillDataSerializer(serializers.Serializer):
    seniority_levels = serializers.ListField(child=serializers.CharField())
    experience_levels = serializers.ListField(child=serializers.CharField())
