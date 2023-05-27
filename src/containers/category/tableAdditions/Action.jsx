import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryContex } from "../../../context/categoryContext";

export const Actions = ({ item, handleDeleteCategory }) => {
  const navigate = useNavigate();
  const param = useParams();
  const { setEditeId } = useContext(CategoryContex);
  return (
    <>
      {!param.categoryId ? (
        <i
          className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
          title="زیرمجموعه"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          onClick={() =>
            navigate(`/category/${item.id}`, {
              state: {
                parentData: item,
              },
            })
          }
        ></i>
      ) : null}

      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش دسته"
        data-bs-toggle="modal"
        data-bs-placement="top"
        data-bs-target="#add_product_category_modal"
        onClick={() => setEditeId(item.id)}
      ></i>
      {/* {item.parent_id ? ( */}
      {param.categoryId ? (
        <i
          className="fas fa-receipt text-success mx-1 hoverable_text pointer has_tooltip"
          title="افزودن ویژگی"
          data-bs-toggle="modal"
          data-bs-target="#add_product_category_attr_modal"
          onClick={() => {
 
            navigate(`/category/${item.id}/attributes`, {
              state: {
                categoryData: item,
              },
            });
          }}
        ></i>
      ) : null}

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف دسته"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={() => handleDeleteCategory(item)}
      ></i>
    </>
  );
};
