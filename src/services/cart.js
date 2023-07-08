import httpService from "./httpService";

export const getAllCartsService = () => {
    return httpService(`/api/admin/carts`, "get");
  };
export const getSingellCartsService = (id) => {
    return httpService(`/api/admin/carts/${id}`, "get");
  };

  export const deleteCartService = (id ) => {
    return httpService(`/api/admin/carts/${id}`, "delete");
  };
  export const editCartService = (cartId, data) => {
    return httpService(`/api/admin/carts/${cartId}`, "put", data);
  }
  export const addNewCartService = (data) => {
    return httpService(`/api/admin/carts`,"post",data);
  };



