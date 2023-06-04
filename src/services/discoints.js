import httpService from "./httpService";

export const GetAllDicount = () => {
  return httpService(`/api/admin/discounts`, "get");
};
export const addNewDicount = (data) => {
  return httpService(`/api/admin/discounts`, "post", data);
};
export const GetOneDicount = (id) => {
  return httpService(`/api/admin/discounts/${id}`, "get");
};
export const editDicount = (id, data) => {
  return httpService(`/api/admin/discounts/${id}`, "put", data);
};
export const deleteDicount = (id) => {
  return httpService(`/api/admin/discounts/${id}`, "delete");
};

// https://ecomadminapi.azhadev.ir/api/admin/discounts
