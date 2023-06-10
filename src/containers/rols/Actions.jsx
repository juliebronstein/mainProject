import React from "react";
import {  useNavigate } from "react-router-dom";

export const Actions = ({ item,handelDeleteRole}) => {
  return (
    <>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش نقش"
        data-bs-toggle="modal"
        data-bs-placement="top"
        data-bs-target="#add_role_modal"
      ></i>
      <i
        className="fas fa-receipt text-success mx-1 hoverable_text pointer has_tooltip"
        title="دسترسی ها"
      ></i>
    
      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف نفش"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={()=>handelDeleteRole(item)}
      ></i>
    </>
  );
};
