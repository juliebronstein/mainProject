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
  
    
export const getSinglrRoleService = (roleId)=>{
  return httpService(`/api/admin/roles/${roleId}`, "get")
}




export const editRoleService = (roleId, data)=>{
  return httpService(`/api/admin/roles/${roleId}`, "put", data)
}




export const editRolePermissionsService = (roleId, data)=>{
  return httpService(`/api/admin/roles/${roleId}/permissions`, "put", data)
}