import React from "react";
import { useNavigate } from "react-router-dom";
import { ActionIcon } from "../../components/ActionIcon";

export const Actions = ({ item,handleDeleteUser }) => {
  const navigate=useNavigate()
  return (
    <>
      <ActionIcon
        icon="fas fa-edit text-warning"
        pTitle="update_user"
        title="ویرایش کاربر"
        onClick={()=>{navigate('/users/add-user',{state:{selectedUserId:item.id}})}}
      ></ActionIcon>
      <ActionIcon
        icon="fas fa-times text-danger"
        pTitle="delete_user"
        title="حذف کاربر"
        onClick={()=> handleDeleteUser(item.id)}
      ></ActionIcon>
    </>
  );
};
