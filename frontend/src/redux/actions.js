import { EDIT_SEARCH, GET_EMPLOYEES } from "./actionTypes";

export const editSearch = searchTerm => ({
  type: EDIT_SEARCH,
  payload: {
    searchTerm
  }
});

export const setEmployees = employees => ({
  type: GET_EMPLOYEES,
  payload: {
    employees
  }
});

