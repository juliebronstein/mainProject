import React from "react";

export const Actions = ({ item,handleDeleteBrans,setEditeBrand}) => {
  return (
    <>


      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش برند"
        data-bs-toggle="modal"
        data-bs-placement="top"
        data-bs-target="#add_brand_modal"
        onClick={()=>{setEditeBrand(item)}}
      ></i>


      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف برند"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={()=>{handleDeleteBrans(item)}}
      ></i>
    </>
  );
};
