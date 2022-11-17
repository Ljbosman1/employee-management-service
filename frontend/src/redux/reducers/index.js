import { 
  EDIT_SEARCH, 
  CREATE_EMPLOYEE, 
  GET_EMPLOYEES_FROM_API, 
  EMPLOYEES_ERROR, 
  SET_SELECTED_EMPLOYEE, 
  DELETE_EMPLOYEE,
  EDIT_EMPLOYEE,
  GET_SKILLS,
  GET_SKILL_DATA,
  CREATE_SKILLS,
  ADD_SKILLS_TO_STATE
} from "../actionTypes";

const initialState = {
  employees: [],
  searchTerm: "",
  selectedEmployee: {},
  skillData: {},
  skills: [],
  stateSkills: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEES_FROM_API: {
      return {
        ...state,
        employees: action.payload,
      };
    }
    case EMPLOYEES_ERROR: {
      return {
        ...state,
        employees: action.payload
      };
    }
    case EDIT_SEARCH: {
      return {
        ...state,
        searchTerm: action.payload
      };
    }
    case SET_SELECTED_EMPLOYEE: {
      return {
        ...state,
        selectedEmployee: action.payload
      };
    }
    case CREATE_EMPLOYEE: {
      return {
        ...state,
        employees: [...state.employees, action.payload],
        selectedEmployee: {}
      };
    }
    case CREATE_SKILLS: {
      return {
        ...state
      };
    }
    case ADD_SKILLS_TO_STATE: {
      return {
        ...state,
        stateSkills: action.payload
      };
    }
    case EDIT_EMPLOYEE: {
      var tempArr = [...state.employees]
      tempArr = tempArr.map(function(item) { return item.employeeId === action.payload.employeeId ? action.payload : item; });
      return {
        ...state,
        employees: tempArr,
        selectedEmployee: {},
      };
    }
    case DELETE_EMPLOYEE: {
      var employees = [...state.employees]
      return {
        ...state,
        employees: employees.filter(employee => employee.employeeId !== action.payload),
        selectedEmployee: {}
      };
    }
    case GET_SKILLS: {
      return {
        ...state,
        skills: action.payload
      };
    }
    case GET_SKILL_DATA: {
      return {
        ...state,
        skillData: action.payload
      };
    }
    default:
      return state;
  }
}
