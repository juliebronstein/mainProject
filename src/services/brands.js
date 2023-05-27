
import httpService from "./httpService";

export const getAllBrandsService = ( ) => {
    return httpService('/api/admin/brands', "get");
  };
  export const deleteBrandsService = (id ) => {
    return httpService(`/api/admin/brands/${id}`, "delete");
  };
  export const editBrandsService = (id,data) => {
    return httpService(`/api/admin/brands/${id}`, "post", data);
  };
  export const ceateBrandsService = (data) => {
    if(data.image){
      let formdata=new FormData()
      formdata.append('original_name',data.original_name)
      formdata.append('persian_name',data.persian_name)
      formdata.append('descriptions',data.descriptions)
      formdata.append('logo',data.logo)
      data=formdata
    }
      return httpService(`/api/admin/brands`, "post",data);
    };
