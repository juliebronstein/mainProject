import React from "react";
import { ActionIcon } from "../../../components/ActionIcon";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../../layouts/admin/utils/alert";
export const Actions = ({ item, handleDeleteCart }) => {
  const navigation = useNavigate();
  return (
    <>
      <ActionIcon
        pTitle="update_carts"
        icon="fas fa-edit text-warning"
        title="ویرایش سبد"
        data-bs-target="#add_cart_modal"
        onClick={() => {
          if (!item.is_ordered)
            navigation("/carts/add-cart", { state: { editId: item.id } });
           else Alert("خطا","این سبد به دلیل ثبت سفارش قابل ویرایش  نیست","warning")
        }}
        //  onClick={()=>{
        //   navigation('/carts/add-cart',{state:{editId:item.id}})

        //  }}
      />

      <ActionIcon
        icon="fas fa-times text-danger"
        pTitle="delete_carts"
        title="حذف سبد"
        onClick={() => {
          if (!item.is_ordered) handleDeleteCart(item.id);
           else Alert("خطا","این سبد به دلیل ثبت سفارش قابل حذف نیست","warning")
        }}
      />
    </>
  );
};
