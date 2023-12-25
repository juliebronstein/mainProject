import React from "react";
import { ActionIcon } from "../../components/ActionIcon";
export const Actions = ({ item, handleDeleteGuaranty, setEditeGuarantyId }) => {
  return (
    <>
      <ActionIcon
        icon="fas fa-edit text-warning"
        pTitle="update_guarantee"
        title="ویرایش گارانتی"
        data-bs-target="#add_guarantee_modal"
        onClick={() => { setEditeGuarantyId(item.id);
        
        }}
      ></ActionIcon> 
      <ActionIcon
       icon="fas fa-times text-danger"
       pTitle="delete_guarantee"
       title="حذف گارانتی"
       onClick={()=>{handleDeleteGuaranty(item.id)}}
      ></ActionIcon>   

    </>
  );
};
