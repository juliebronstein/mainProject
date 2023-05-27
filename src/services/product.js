import httpService from "./httpService";

export const getProductsService = (page, countOnPage, searchChar) => {
  return httpService(`/api/admin/products?page=${page}&count=${countOnPage}&searchChar=${searchChar}`, "get");
};
export const deleteProductService = (id) => {
  return httpService(`/api/admin/products/${id}`, "delete");
};
  
//https://ecomadminapi.azhadev.ir/api/admin/products
