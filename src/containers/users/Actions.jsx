import React from "react";
import { useNavigate } from "react-router-dom";

export const Actions = ({ item,handleDeleteUser }) => {
  const navigate=useNavigate()
  return (
    <>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش کاربر"
        data-bs-placement="top"
        data-bs-toggle="tooltip"
        onClick={()=>{navigate('/users/add-user',{state:{selectedUserId:item.id}})}}
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
