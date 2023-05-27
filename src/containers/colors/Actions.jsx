import React, { useContext } from "react";
import { colorContex } from "../../context/colorContext";
export const Actions = ({ item, handleDeleteColor, setEditeColorId }) => {
  const { setEditeIdctx } = useContext(colorContex);
  return (
    <>
      {/* <i
        className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
        title="زیرمجموعه"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
      ></i> */}

      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش رنگ"
        data-bs-toggle="modal"
        data-bs-placement="top"
        data-bs-target="#add_color_modal"
        onClick={() => {
          setEditeColorId(item.id);
          setEditeIdctx(item.id);
        }}
      ></i>

      {/* <i
        className="fas fa-receipt text-success mx-1 hoverable_text pointer has_tooltip"
        title="افزودن ویژگی"
        data-bs-toggle="modal"
        data-bs-target="#add_product_category_attr_modal"
      ></i> */}

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف رنگ"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={() => {
          handleDeleteColor(item);
        }}
      ></i>
    </>
  );
};
