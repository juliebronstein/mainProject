import React from "react";
import { useNavigate } from "react-router-dom";
import { ActionIcon } from "../../components/ActionIcon";

 const Actions = ({ item,handleDeletediscount }) => {
  const navigate=useNavigate()
  return (
    <>
      <ActionIcon
        icon="fas fa-edit text-warning"
        pTitle="update_discount"
        title="ویرایش کد"
        data-bs-target="#add_discount_modal"
        onClick={()=>{
          navigate('/discounts/add-discount',{ state: { discountSelected: item } })
  
        }}
      />
      <ActionIcon
        icon="fas fa-times text-danger"
        pTitle="delete_discount"
        title="حذف کد"
        onClick={()=>{handleDeletediscount(item)}}
      ></ActionIcon>
    </>
  );
};
export default Actions