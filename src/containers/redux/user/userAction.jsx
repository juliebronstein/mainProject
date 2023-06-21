import {
  RECIVE_USER_ERROR,
  RECIVE_USER_RESPONSE,
  SEND_USER_REQUEST,
} from "./userActionType";

export const sendUserRequest = () => {
  return {
    type: SEND_USER_REQUEST,
  };
};
export const reciveUserResponse = (data) => {
  return {
    type: RECIVE_USER_RESPONSE,
    payload: data,
  };
};
export const reciveUserError = (err) => {
  return {
    type: RECIVE_USER_ERROR,
    payload: err,
  };
};
