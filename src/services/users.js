import httpService from "./httpService";

export const getAllUsersService = () => {
    return httpService(`/api/admin/users`, "get");
  };

  export const deleteUserService = (id ) => {
    return httpService(`/api/admin/users${id}`, "delete");
  };
  export const editeUserService = (id ,data) => {
    return httpService(`/api/admin/users/${id}`, "put",data);
  };
  export const addNewUserService = (data) => {

    return httpService(`/api/admin/users`,"post",data);
  };



