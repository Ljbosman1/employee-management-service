export const getSkillsByEmployeeId = (store, employeeId) => {
  const allSkills = store.skills;
  return employeeId ? (
    allSkills.filter(
      skill => skill.employeeId === employeeId
    )
  ) : [];
}

export const getEmployeesBySearchTerm = (store, state) => {
  const allEmployees = store.employees;
  return (state.searchTerm && state.searchTerm.length > 0) ? (
      allEmployees.filter(
        employee => employee.firstName.includes(state.searchTerm) === true
        || employee.lastName.includes(state.searchTerm) === true
        || employee.email.includes(state.searchTerm) === true
        || employee.employeeId.includes(state.searchTerm) === true
      )
    ) : allEmployees;
};