import {
  RECIVE_ROLE_ERROR,
  RECIVE_ROLE_PERSON,
  SEND_ROLE_REQUEST,
} from "./roleActionType";

export const initState = {
  loading: false,
  roles: [],
  error: "",
};

const rolesReducer = (state = initState, action) => {
  switch (action.type) {
    case SEND_ROLE_REQUEST:
      return { ...state, loading: true };
    case RECIVE_ROLE_PERSON:
      return { loading: false, roles: action.payload, error: "" };
    case RECIVE_ROLE_ERROR:
      return { loading: false, roles: [], error: action.payload };
    default:
      return state;
  }
};
export default rolesReducer;
