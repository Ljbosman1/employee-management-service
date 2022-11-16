import { 
  EDIT_SEARCH, 
  CREATE_EMPLOYEE,
  EDIT_EMPLOYEE,
  GET_EMPLOYEES_FROM_API, 
  EMPLOYEES_ERROR, 
  SET_SELECTED_EMPLOYEE, 
  DELETE_EMPLOYEE,
  GET_SKILLS,
  GET_SKILL_DATA,
  CREATE_SKILLS,
  ADD_SKILL_TO_STATE
} from "./actionTypes";
import { EMPLOYEES_API_URL, SKILLS_API_URL, SKILL_DATA_API_URL } from "../constants";
import {mapSnakeToCamel, mapCamelToSnake} from "../utils/utils"

import axios from 'axios'

export const getEmployeesFromApi = () => async dispatch => {
  try{
    const res = await axios.get(EMPLOYEES_API_URL);
    res.data.forEach(employee => mapSnakeToCamel(employee));
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

export const getSkillsFromApi = () => async dispatch => {
  try{
    const res = await axios.get(SKILLS_API_URL);
    res.data.forEach(skill => mapSnakeToCamel(skill));
    dispatch( {
        type: GET_SKILLS,
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

export const getSkillDataFromApi = () => async dispatch => {
  try{
    const res = await axios.get(SKILL_DATA_API_URL);
    mapSnakeToCamel(res.data);
    dispatch( {
        type: GET_SKILL_DATA,
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
    mapSnakeToCamel(payload);
    const res = await axios.post(EMPLOYEES_API_URL, payload);
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

export const createSkills = (payload) => async dispatch => {
  try{
    payload.forEach(skill => mapCamelToSnake(skill));
    await axios.post(SKILLS_API_URL, payload);
    payload.forEach(skill => mapSnakeToCamel(skill));
    dispatch( {
        type: CREATE_SKILLS,
        payload: payload
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
    mapSnakeToCamel(payload);
    axios.put(EMPLOYEES_API_URL + employeeId, payload);
    dispatch( {
        type: EDIT_EMPLOYEE,
        payload: payload
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
    axios.delete(EMPLOYEES_API_URL + employeeId);
    dispatch( {
        type: DELETE_EMPLOYEE,
        payload: employeeId
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

export const setSelectedEmployee = selectedEmployee => ({
  type: SET_SELECTED_EMPLOYEE,
  payload: selectedEmployee
});

export const addSkillToState = (payload) => async dispatch => {
  dispatch({
    type: ADD_SKILL_TO_STATE,
    payload: payload,
  })
};