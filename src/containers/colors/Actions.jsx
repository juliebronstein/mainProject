import React, { useContext } from "react";
import { colorContex } from "../../context/colorContext";
import { ActionIcon } from "../../components/ActionIcon";
export const Actions = ({ item, handleDeleteColor, setEditeColorId }) => {
  const { setEditeIdctx } = useContext(colorContex);
  return (
    <>
      <ActionIcon
      pTitle="update_color"
        icon="fas fa-edit text-warning"
        title="ویرایش رنگ"
        data-bs-target="#add_color_modal"
        onClick={() => {
          setEditeColorId(item.id);
          setEditeIdctx(item.id);
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
