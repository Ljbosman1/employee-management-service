from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Employee
from .serializers import EmployeeSerializer


@api_view(["GET", 'POST'])
def employees_list(request):
    if request.method == 'GET':
        data = Employee.objects.all()
        serializer = EmployeeSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            employee = serializer.save()
            return Response(
                status=status.HTTP_201_CREATED,
                data={
                    "first_name": employee.first_name,
                    "last_name": employee.last_name,
                    "employee_id": employee.employee_id
                }
            )


@api_view(['GET', 'PUT', 'DELETE'])
def employees_detail(request, employee_id):
    try:
        employee = Employee.objects.get(employee_id=employee_id)
    except Employee.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = EmployeeSerializer(employee, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK, data=serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        serializer = EmployeeSerializer(employee, context={'request': request})
        return Response(status=status.HTTP_200_OK, data=serializer.data)
