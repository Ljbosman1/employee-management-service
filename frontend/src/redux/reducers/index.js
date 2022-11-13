import { 
  EDIT_SEARCH, 
  CREATE_EMPLOYEE, 
  GET_EMPLOYEES_FROM_API, 
  EMPLOYEES_ERROR, 
  SET_SELECTED_EMPLOYEE, 
  DELETE_EMPLOYEE, 
  TOGGLE_MODAL, 
  EDIT_EMPLOYEE,
} from "../actionTypes";

const initialState = {
  employees: [],
  searchTerm: "",
  modalState: false,
  selectedEmployee: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEES_FROM_API: {
      return {
        ...state,
        employees:action.payload
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
      console.log("SET THE SELECTED EMPLOYEE: ", action.payload);
      return {
        ...state,
        selectedEmployee: action.payload
      };
    }
    case TOGGLE_MODAL: {
      return {
        ...state,
        modalState: !state.modalState
      };
    }
    case CREATE_EMPLOYEE: {
      return {
        ...state,
        selectedEmployee: {}
      };
    }
    case EDIT_EMPLOYEE: {
      return {
        ...state,
        selectedEmployee: {}
      };
    }
    case DELETE_EMPLOYEE: {
      return {
        ...state,
        selectedEmployee: {}
      };
    }
    default:
      return state;
  }
}
