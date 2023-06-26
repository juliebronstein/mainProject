import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryContex } from "../../../context/categoryContext";
import { ActionIcon } from "../../../components/ActionIcon";

export const Actions = ({ item, handleDeleteCategory }) => {
  const navigate = useNavigate();
  const param = useParams();
  const { setEditeId } = useContext(CategoryContex);
  return (
    <>
      {!param.categoryId ? (
        <ActionIcon
        icon="fas fa-project-diagram text-info "
          pTitle="read_categor" title="زیرمجموعه"
          onClick={() =>
            navigate(`/category/${item.id}`, {
              state: {
                parentData: item,
              },
            })
          }
        ></ActionIcon>
      ) : null}

      <ActionIcon
      pTitle="update_category" 
      icon="fas fa-edit text-warning"
        title=" ویرایش دسته"
        data-bs-toggle="modal"
        data-bs-target="#add_product_category_modal"
        onClick={() => setEditeId(item.id)}
      ></ActionIcon>
      {/* {item.parent_id ? ( */}
      {param.categoryId ? (
        <ActionIcon
          icon="fas fa-receipt text-success"
          title="افزودن ویژگی"
          data-bs-target="#add_product_category_attr_modal"
          onClick={() => {
            navigate(`/category/${item.id}/attributes`, {
              state: {
                categoryData: item,
              },
            });
          }}
        />
      ) : null}

      <ActionIcon
        icon="fas fa-times text-danger"
        title="حذف دسته"
        onClick={() => handleDeleteCategory(item)}
      />
    </>
  );
};
