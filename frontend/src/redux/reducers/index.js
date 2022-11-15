import { 
  EDIT_SEARCH, 
  CREATE_EMPLOYEE, 
  GET_EMPLOYEES_FROM_API, 
  EMPLOYEES_ERROR, 
  SET_SELECTED_EMPLOYEE, 
  DELETE_EMPLOYEE,
  EDIT_EMPLOYEE,
} from "../actionTypes";

const initialState = {
  employees: [],
  searchTerm: "",
  selectedEmployee: {},
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
    case EDIT_EMPLOYEE: {
      var tempArr = [...state.employees]
      tempArr = tempArr.map(function(item) { return item.employee_id === action.payload.employee_id ? action.payload : item; });
      
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
        employees: employees.filter(employee => employee.employee_id !== action.payload),
        selectedEmployee: {}
      };
    }
    default:
      return state;
  }
}
