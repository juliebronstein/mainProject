import httpService from "./httpService";

export const getAllRoles = ( ) => {
    return httpService(`/api/admin/roles`, "get");
  };
  export const deleteRole = (id) => {
    return httpService(`/api/admin/roles/${id}`, "delete");
  };
  export const editRole = (id,data) => {
    return httpService(`/api/admin/roles/${id}`, "put",data);
  };
  export const addNewRole = (data) => {
    return httpService(`/api/admin/roles`, "post",data);
  };
  
  
  export const getAllPermissions = ( ) => {
      return httpService(`/api/admin/permissions`, "get");
    };
  