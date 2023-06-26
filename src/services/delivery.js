import httpService from "./httpService";

export const getAllDeliveriesService = ( ) => {
    return httpService('/api/admin/deliveries', "get");
  };
  
export const getSindleDeliveryServise = ( id) => {
    return httpService(`/api/admin/deliveries/${id}`, "get");
  };

export const deleteDeliveryService = (id ) => {
    return httpService(`/api/admin/deliveries/${id}`, "delete");
  };
export const ceateDeliveryService = (data) => {
    return httpService(`/api/admin/deliveries`, "post",data);
  };
export const editDeliveryService = (id,data) => {
  return httpService(`/api/admin/deliveries/${id}`, "put", data);
  };
