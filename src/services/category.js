import httpService from "./httpService";

export const getCategoriesService = (id = null) => {
  return httpService(`/api/admin/categories${id ? `?parent=${id}` : ""}`, "get");
};
export const getSingelCategoryService = (id ) => {
  return httpService(`/api/admin/categories/${id}`, "get");
};
export const editeCategoryService = (id ,data) => {
  return httpService(`/api/admin/categories/${id}`, "put",data);
};
export const deleteCategoryService = (id ) => {
  return httpService(`/api/admin/categories/${id}`, "delete");
};

export const addNewCategoryService=(data)=>{
  if(data.image){
    let formdata=new FormData()
    formdata.append('parent_id',data.parent_id)
    formdata.append('title',data.title)
    formdata.append('description',data.description)
    formdata.append('image',data.image)
    formdata.append('is_active',data.is_active)
    formdata.append('show_in_menu',data.show_in_menu)
    data=formdata
  }
  return httpService(`/api/admin/categories`, "post",data);
}