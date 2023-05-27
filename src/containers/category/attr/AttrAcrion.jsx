import React from "react";


export const Actions = ({ item, handleDeleteAttribute,attrToEdite,setAttrToEdite }) => {
  return (
    <div className={`text-center ${attrToEdite ?  "alert-danger danger-shadow":""} `} >

      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش ویژگی"
        data-bs-toggle="modal"
        data-bs-placement="top"
        data-bs-target="#add_product_category_modal"
        onClick={()=>{
           setAttrToEdite(item)
        }}
      ></i>
   

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف ویژگی"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={() => handleDeleteAttribute(item)}
      ></i>
    </div>
  );
};
