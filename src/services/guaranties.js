import httpService from "./httpService";

export const getAllGuarantysService = ( ) => {
    return httpService('/api/admin/guarantees', "get");
  };
  
export const getSindleGuarantyServise = ( id) => {
    return httpService(`/api/admin/guarantees/${id}`, "get");
  };
  

export const deleteGuarantyService = (id ) => {
    return httpService(`/api/admin/guarantees/${id}`, "delete");
  };
export const addNewGuarantyService = (data) => {
      return httpService("/api/admin/guarantees", "post", data);
  };
export const editGuarantyService = (id,data) => {
  return httpService(`/api/admin/guarantees/${id}`, "put", data);
  };
