import React from "react";
import { useNavigate } from "react-router-dom";

 const Actions = ({ item,handleDeletediscount }) => {
  const navigate=useNavigate()
  return (
    <>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش کد"
        data-bs-toggle="modal"
        data-bs-placement="top"
        data-bs-target="#add_discount_modal"
        onClick={()=>{
          navigate('/discounts/add-discount',{ state: { discountSelected: item } })
  
        }}
      ></i>
      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف کد"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={()=>handleDeletediscount(item)}
      ></i>
    </>
  );
};
export default Actions