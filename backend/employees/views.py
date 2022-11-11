from django.core import serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Employee, Skill
from .constants import SENIORITY_RATING_CHOICES, EXPERIENCE_LEVEL_CHOICES
from .serializers import EmployeeRequestSerializer, EmployeeResponseSerializer, SkillSerializer


@api_view(["GET", 'POST'])
def employees_list(request):
    if request.method == 'GET':
        data = Employee.objects.all()
        serializer = EmployeeRequestSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = EmployeeRequestSerializer(data=request.data)
        if serializer.is_valid():
            employee = serializer.save()
            return Response(
                status=status.HTTP_201_CREATED,
                data=EmployeeResponseSerializer(employee).data
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def employee_detail(request, employee_id):
    try:
        employee = Employee.objects.get(employee_id=employee_id)
    except Employee.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = EmployeeRequestSerializer(employee, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(
                status=status.HTTP_200_OK,
                data=EmployeeResponseSerializer(employee).data
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        return Response(
            status=status.HTTP_200_OK,
            data=EmployeeResponseSerializer(employee).data
        )


@api_view(["GET", 'POST'])
def skills_list(request):
    if request.method == 'GET':
        data = Skill.objects.all()
        serializer = SkillSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SkillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                status=status.HTTP_201_CREATED,
                data=serializer.data
            )
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def skill_detail(request, pk):
    try:
        skill = Skill.objects.get(pk=pk)
    except Skill.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = SkillSerializer(skill, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK, data=serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        skill.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        return Response(
            status=status.HTTP_200_OK,
            data=SkillSerializer(skill).data
        )


@api_view(["GET"])
def skill_dropdown_data(request):
    return Response(
        {
            "seniority_levels": map(lambda x: x[0], SENIORITY_RATING_CHOICES),
            "experience_levels": map(lambda x: x[0], EXPERIENCE_LEVEL_CHOICES)
        }

    )
