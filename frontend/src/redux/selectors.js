import { mapSnakeToCamel } from "../utils/utils"

export const getSkillsByEmployeeId = (store, employeeId) => {
  const allSkills = [...store.skills];
  // This is a hacky fix for a weird mapping bug where stateSkills and 
  // skills objects get saved in snake case to the store after editing
  // an employee
  allSkills.every(skill => {
    if (Object.keys(skill).filter(key => key.includes("_")).length > 0) {
      mapSnakeToCamel(skill);
      return false;
    }
    return true
  })
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

export const getState = (store) => store;