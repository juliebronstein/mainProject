import React from "react";
import { useNavigate } from "react-router-dom";

export const Actions = ({ item,handleDeleteUser,setEditeUserId }) => {
  const navigate=useNavigate()
  return (
    <>
         {item.roles ? (
        <i
          className="fas fa-receipt text-success mx-1 hoverable_text pointer has_tooltip"
          title="افزودن ویژگی"
          data-bs-toggle="modal"
          data-bs-target="#add_product_category_attr_modal"
          onClick={() => {
 
            navigate(`/category/${item.id}/attributes`, {
              state: {
                categoryData: item,
              },
            });
          }}
        ></i>
      ) : null}

      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش کاربر"
        data-bs-toggle="modal"
        data-bs-placement="top"
        data-bs-target="#add_user_modal"
        onClick={()=>setEditeUserId(item.id)}
      ></i>

      <i
        className="fas fa-receipt text-success mx-1 hoverable_text pointer has_tooltip"
        title="افزودن ویژگی"
        data-bs-toggle="modal"
        data-bs-target="#add_product_category_attr_modal"
      ></i>

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف کاربر"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={()=> handleDeleteUser(item.id)}
      ></i>
    </>
  );
};
