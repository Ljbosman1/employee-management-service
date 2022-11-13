import { 
  EDIT_SEARCH, 
  CREATE_EMPLOYEE,
  EDIT_EMPLOYEE,
  GET_EMPLOYEES_FROM_API, 
  EMPLOYEES_ERROR, 
  SET_SELECTED_EMPLOYEE, 
  DELETE_EMPLOYEE, 
  TOGGLE_MODAL,
} from "./actionTypes";
import { EMPLOYEES_API_URL } from "../constants";

import axios from 'axios'

export const getEmployeesFromApi = () => async dispatch => {

  try{
    const res = await axios.get(EMPLOYEES_API_URL);
    dispatch( {
        type: GET_EMPLOYEES_FROM_API,
        payload: res.data
    })
  }
  catch(e){
      dispatch( {
          type: EMPLOYEES_ERROR,
          payload: console.log(e),
      })
  }
}

export const createEmployee = (payload) => async dispatch => {
  try{
    const res = axios.post(EMPLOYEES_API_URL, payload);
    dispatch( {
        type: CREATE_EMPLOYEE,
        payload: res.data
    })
  }
  catch(e){
      dispatch( {
          type: EMPLOYEES_ERROR,
          payload: console.log(e),
      })
  }
}

export const editEmployee = (employeeId, payload) => async dispatch => {
  try{
    const res = axios.put(EMPLOYEES_API_URL + employeeId, payload);
    dispatch( {
        type: EDIT_EMPLOYEE,
        payload: res.data
    })
  }
  catch(e){
      dispatch( {
          type: EMPLOYEES_ERROR,
          payload: console.log(e),
      })
  }
}

export const deleteEmployee = (employeeId) => async dispatch => {
  try{
    const res = axios.delete(EMPLOYEES_API_URL + employeeId);
    dispatch( {
        type: DELETE_EMPLOYEE,
        payload: res.data
    })
  }
  catch(e){
      dispatch( {
          type: EMPLOYEES_ERROR,
          payload: console.log(e),
      })
  }
}

export const editSearch = searchTerm => ({
  type: EDIT_SEARCH,
  payload: {
    searchTerm
  }
});

export const setSelectedEmployee = selected_employee => ({
  type: SET_SELECTED_EMPLOYEE,
  payload: {
    selected_employee
  }
});

export const toggleModal = () => ({
  type: TOGGLE_MODAL,
  payload: {
  }
});