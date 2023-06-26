import React from "react";
import { ActionIcon } from "../../../components/ActionIcon";


export const Actions = ({ item, handleDeleteAttribute,attrToEdite,setAttrToEdite }) => {
  return (
    <div className={`text-center ${attrToEdite ?  "alert-danger danger-shadow":""} `} >

      <ActionIcon
      pTitle="update_category_attr"
        icon="fas fa-edit text-warning"
        title="ویرایش ویژگی"
        data-bs-target="#add_product_category_modal"
        onClick={()=>{
           setAttrToEdite(item)
        }}
      />
   

      <ActionIcon
      pTitle="delete_category_attr"
        icon="fas fa-times text-danger"
        title="حذف ویژگی"
        onClick={() => handleDeleteAttribute(item)}
      />
    </div>
  );
};
