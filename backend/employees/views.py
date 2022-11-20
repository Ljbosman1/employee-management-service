from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import GenericAPIView
from rest_framework import status

from .models import Employee, Skill
from .constants import SENIORITY_RATING_CHOICES, EXPERIENCE_LEVEL_CHOICES
from .serializers import EmployeeRequestSerializer, EmployeeResponseSerializer, SkillSerializer, SkillDataSerializer


class EmployeesListView(GenericAPIView):
    """
    get:
    Return a list of all the existing employees.

    post:
    Create a new employee.
    """
    serializer_class = EmployeeRequestSerializer

    @swagger_auto_schema(
        responses={status.HTTP_200_OK: EmployeeResponseSerializer(many=True)},
    )
    def get(self, request):
        data = Employee.objects.all()
        serializer = EmployeeResponseSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        responses={status.HTTP_201_CREATED: EmployeeResponseSerializer(many=True)},
    )
    def post(self, request):
        serializer = EmployeeRequestSerializer(data=request.data)
        if serializer.is_valid():
            employee = serializer.save()
            return Response(
                status=status.HTTP_201_CREATED,
                data=EmployeeResponseSerializer(employee).data
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployeesDetailView(GenericAPIView):
    """
    get:
    Return all details for a specific employee.

    put:
    Update specific employee instance.

    delete:
    Delete specific employee instance.
    """
    serializer_class = EmployeeRequestSerializer
    def __get_employee(self, employee_id):
        try:
            employee = Employee.objects.get(employee_id=employee_id)
            return employee
        except Employee.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @swagger_auto_schema(
        responses={status.HTTP_200_OK: EmployeeResponseSerializer()},
    )
    def put(self, request, employee_id):
        employee = self.__get_employee(employee_id)
        if type(employee) == Response:
            return employee

        serializer = EmployeeRequestSerializer(employee, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(
                status=status.HTTP_200_OK,
                data=EmployeeResponseSerializer(employee).data
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={status.HTTP_204_NO_CONTENT: ""},
    )
    def delete(self, request, employee_id):
        employee = self.__get_employee(employee_id)
        if type(employee) == Response:
            return employee
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @swagger_auto_schema(
        responses={status.HTTP_200_OK: EmployeeResponseSerializer()},
    )
    def get(self, request, employee_id):
        employee = self.__get_employee(employee_id)
        if type(employee) == Response:
            return employee
        return Response(
            status=status.HTTP_200_OK,
            data=EmployeeResponseSerializer(employee).data
        )


class SkillsListView(GenericAPIView):
    """
    get:
    Return a list of all the existing skill instances.

    post:
    Create new skill instances.
    """
    serializer_class = SkillSerializer
    @swagger_auto_schema(
        responses={status.HTTP_200_OK: SkillSerializer(many=True)},
    )
    def get(self, request):
        data = Skill.objects.all()
        serializer = SkillSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        responses={status.HTTP_201_CREATED: SkillSerializer(many=True)},
    )
    def post(self, request):
        serializer = SkillSerializer(data=request.data, many=True)
        if serializer.is_valid():
            # Remove all skills related to employee ids given before saving
            deleted_ids = []
            for skill in request.data:
                if skill["employee_id"] in deleted_ids:
                    continue
                Skill.objects.filter(employee=skill["employee_id"]).delete()
                deleted_ids.append(skill["employee_id"])
            serializer.save()
            return Response(
                status=status.HTTP_201_CREATED,
                data=serializer.data
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    methods=['get'],
    responses={status.HTTP_200_OK: SkillDataSerializer()},
)
@api_view(["GET"])
def skill_dropdown_data(request):
    """
    get:
    Return an object containing all skill dropdown field data.
    """
    return Response(
        {
            "seniority_levels": map(lambda x: x[0], SENIORITY_RATING_CHOICES),
            "experience_levels": map(lambda x: x[0], EXPERIENCE_LEVEL_CHOICES)
        }

    )
