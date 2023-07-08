import React, { useContext } from "react";
import { ActionIcon } from "../../components/ActionIcon";
export const Actions = ({ item, handleDeleteColor, setEditeColorId }) => {

  return (
    <>
      <ActionIcon
      pTitle="update_color"
        icon="fas fa-edit text-warning"
        title="ویرایش رنگ"
        data-bs-toggle="modal"
        data-bs-placement="top"
        data-bs-target="#add_color_modal"
        onClick={() => {
          setEditeColorId(item.id);
       
        }}
      />

       <ActionIcon
        icon="fas fa-times text-danger"
        pTitle="delete_color"
        title="حذف رنگ"
        onClick={() => {
          handleDeleteColor(item);
        }}
      />
    </>
  );
};
