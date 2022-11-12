export const getEmployeesState = store => store.employees;

export const getEmployeeList = store =>
    getEmployeesState(store) ? getEmployeesState(store).employees : [];

export const getSearchTerm = (store) =>
  getEmployeesState(store) ? { ...getEmployeesState(store).searchTerm } : {};

export const getEmployeesBySearchTerm = (store, state) => {
  const allEmployees = getEmployeeList(store);
    
  return (state.searchTerm && state.searchTerm.length > 0) ? (
      allEmployees.filter(
        employee => employee.first_name.includes(state.searchTerm) === true
        || employee.last_name.includes(state.searchTerm) === true
        || employee.email.includes(state.searchTerm) === true
      )
    ) : allEmployees;
};