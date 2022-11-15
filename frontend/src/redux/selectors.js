export const getSkillsByEmployeeId = (store, employeeId) => {
  const allSkills = store.skills;
  return employeeId ? (
    allSkills.filter(
      skill => skill.employee_id === employeeId
    )
  ) : [];
}

export const getEmployeesBySearchTerm = (store, state) => {
  const allEmployees = store.employees;
  return (state.searchTerm && state.searchTerm.length > 0) ? (
      allEmployees.filter(
        employee => employee.first_name.includes(state.searchTerm) === true
        || employee.last_name.includes(state.searchTerm) === true
        || employee.email.includes(state.searchTerm) === true
        || employee.employee_id.includes(state.searchTerm) === true
      )
    ) : allEmployees;
};