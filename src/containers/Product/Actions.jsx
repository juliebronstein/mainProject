import React from "react";
import {  useNavigate } from "react-router-dom";

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
        onClick={() =>
          navigate("/product/set-attr", { state: { selectedProduct: item } })
        }
      ></i>
      <i
        className="fas fa-image text-primary mx-1 hoverable_text pointer has_tooltip"
        title="گالری تصاویر"
        onClick={() =>
          navigate("/product/gallery", { state: { selectedProduct: item } })
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
