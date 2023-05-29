import React from "react";
import { AddButtunLink } from "../../components/form/AddButtunLink";
import { Link, useNavigate } from "react-router-dom";

export const Actions = ({ item, handelDeleteProduct, setEditProduct }) => {
  const navigate = useNavigate();
  return (
    <>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش محصول"
        onClick={() =>
          navigate("/product/add-product", { state: { productEdit: item } })
        }
      ></i>
      <i
        className="fas fa-receipt text-success mx-1 hoverable_text pointer has_tooltip"
        title="افزودن ویژگی"
        data-bs-toggle="modal"
        data-bs-target="#add_product_category_attr_modal" 
        onClick={() =>
          navigate("/product/set-attr", { state: { selectedProduct: item } })
        }
      ></i>
      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف محصول"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={() => handelDeleteProduct(item)}
      ></i>
    </>
  );
};
