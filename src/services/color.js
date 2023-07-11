import httpService from "./httpService";

export const getAllColorsService = ( ) => {
    return httpService('/api/admin/colors', "get");
  };
    
export const deleteColorService = (id ) => {
    return httpService(`/api/admin/colors/${id}`, "delete");
  };
  export const editColorService = (id,data) => {
    return httpService(`/api/admin/colors/${id}`, "put", data);
  };
  
  export const ceateColorService = (data) => {
      return httpService(`/api/admin/colors`, "post",data);
    };
  export const getSindleColorServise = ( id) => {
      return httpService(`/api/admin/colors/${id}`, "get");
    };