import React from "react";
import { ActionIcon } from "../../../components/ActionIcon";
import { useNavigate } from "react-router-dom";
export const Actions = ({ item, handleDeleteDelivary, setEditeDeliveryId }) => {

  const navigation=useNavigate()
  return (
    <>
      <ActionIcon
      pTitle="update_delivery"
        icon="fas fa-edit text-warning"
        title="ویرایش ارسال"
        data-bs-target="#add_delivery_modal"
       onClick={()=>{
        navigation('/deliveries/add-delivary',{state:{editId:item.id}})
       }}
      />

       <ActionIcon
        icon="fas fa-times text-danger"
        pTitle="delete_delivery"
        title="حذف ارسال"
        onClick={() => {
          handleDeleteDelivary(item);
        }}
      />
    </>
  );
};
