
export const getEmployeeList = state => state.employees;

export const getSearchTerm = (state) => state.searchTerm;

export const getEmployeeToDelete = (state) => state.employeeToDelete;

export const getEmployeeToCreate = (state) => state.employeeToCreate;

export const getEmployeesBySearchTerm = (store, state) => {
  const allEmployees = getEmployeeList(store);
  return (state.searchTerm && state.searchTerm.length > 0) ? (
      allEmployees.filter(
        employee => employee.first_name.includes(state.searchTerm) === true
        || employee.last_name.includes(state.searchTerm) === true
        || employee.email.includes(state.searchTerm) === true
        || employee.employee_id.includes(state.searchTerm) === true
      )
    ) : allEmployees;
};