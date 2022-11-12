import { EDIT_SEARCH, GET_EMPLOYEES } from "../actionTypes";

const initialState = {
  employees: [],
  searchTerm: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EDIT_SEARCH: {
      return {
        ...state,
        searchTerm: action.payload
      };
    }
    case GET_EMPLOYEES: {
      return {
        ...state,
        employees: action.payload
      };
    }
    default:
      return state;
  }
}
