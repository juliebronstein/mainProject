import React from "react";
import { ActionIcon } from "../../../components/ActionIcon";
import { useNavigate } from "react-router-dom";
export const Actions = ({ item, handleDeleteCart }) => {

  const navigation=useNavigate()
  return (
    <>
      <ActionIcon
      pTitle="update_carts"
        icon="fas fa-edit text-warning"
        title="ویرایش سبد"
        data-bs-target="#add_cart_modal"//
       onClick={()=>{
        navigation('/carts/add-cart',{state:{editId:item.id}})
       }}
      />

       <ActionIcon
        icon="fas fa-times text-danger"
        pTitle="delete_carts"
        title="آیتم سبد"
        onClick={() => {
          navigation('/carts/add-cart',{state:{editId:item.id}})
        }}
      />
       <ActionIcon
        icon="fas fa-times text-danger"
        pTitle="delete_carts"
        title="حذف سبد"
        onClick={() => {
          handleDeleteCart(item);
        }}
      />
    </>
  );
};
