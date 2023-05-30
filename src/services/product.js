import { convertDataToFormdata } from "../layouts/admin/utils/convertData";
import httpService from "./httpService";

export const getProductsService = (page, countOnPage, searchChar) => {
  return httpService(`/api/admin/products?page=${page}&count=${countOnPage}&searchChar=${searchChar}`, "get");
};
export const deleteProductService = (id) => {
  return httpService(`/api/admin/products/${id}`, "delete");
};
export const editProductService = (id,data) => {
  return httpService(`/api/admin/products/${id}`, "put",data);
};
export const addProductAttrService = (id,data) => {
  return httpService(`/api/admin/products/${id}/add_attr`, "post",data);
};
export const getProductAttrService = (id) => {
  return httpService(`/api/admin/products/${id}/get_attr`, "get");
};
export const createnewProductService = (data) => {

  return httpService('/api/admin/products', 'post', data.image ? convertDataToFormdata(data) : data)
 
};
  
//https://ecomadminapi.azhadev.ir/api/admin/products
