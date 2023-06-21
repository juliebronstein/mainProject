import {
  RECIVE_USER_ERROR,
  RECIVE_USER_RESPONSE,
  SEND_USER_REQUEST,
} from "./userActionType";

export const initState = {
  loading: false,
  user: [],
  error: "",
};

const userReduce = (state = initState, action) => {
  switch (action.type) {
    case SEND_USER_REQUEST:
      return { ...state, loading: true };
    case RECIVE_USER_RESPONSE:
      return { loading: false, user: action.payload, error: "" };
    case RECIVE_USER_ERROR:
      return { loading: false, user: [], error: action.payload };

    default:
      return state;
  }
};
export default userReduce;
