import httpService from "./httpService";

export const getAllUsersService = (page, countOnPage, searchChar) => {
    return httpService(`/api/admin/users?page=${page}&count=${countOnPage}&searchChar=${searchChar}`, "get");
  };
export const getOneUserService = (id) => {
    return httpService(`/api/admin/users/${id}`, "get");
  };
  export const deleteUserService = (id ) => {
    return httpService(`/api/admin/users/${id}`, "delete");
  };
  export const editUserService = (id,data) => {
    return httpService(`/api/admin/users/${id}`,"put",data);
  };
  export const addNewUserService = (data) => {
    return httpService(`/api/admin/users`,"post",data);
  };



