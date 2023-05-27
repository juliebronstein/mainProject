import httpService from "./httpService";

export const getCategoryAttributes = (id ) => {
    return httpService(`/api/admin/categories/${id}/attributes`, "get");
  };
export const getOneCategoryAttributes = (id ) => {
    return httpService(`/api/admin/categories/attributes/${id}`, "get");
  };

  export const deleteAttributeService = (id ) => {
    return httpService(`/api/admin/categories/attributes/${id}`, "delete");
  };
  export const editeAttributeService = (id ,data) => {
    return httpService(`/api/admin/categories/attributes/${id}`, "put",data);
  };
  export const addAttributeService = (categoryId ,data) => {

    return httpService(`/api/admin/categories/${categoryId}/attributes`,"post",data);
  };



 