import httpService from "./httpService";

export const getAllCartsService = () => {
    return httpService(`/api/admin/carts`, "get");
  };
export const getSingelCartsService = (id) => {
    return httpService(`/api/admin/carts/${id}`, "get");
  };

  export const deleteCartService = (id ) => {
    return httpService(`/api/admin/carts${id}`, "delete");
  };
  export const editeCartService = (id ,data) => {
    return httpService(`/api/admin/carts/${id}`, "put",data);
  };
  export const addNewCartService = (data) => {
    return httpService(`/api/admin/carts`,"post",data);
  };



