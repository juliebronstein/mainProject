import React, { useEffect, useState } from "react";
import ModalContainer from "../../components/ModalContainer";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { initialValues, onSubmit, validationSchema } from "./core";
import {
  getAllProductsService,
  getOneProductsService,
} from "../../services/product";
import FormikError from "../../components/form/FromikError";
import SelectSearch from "react-select-search";
import "react-select-search/style.css";
import { Alert } from "../../layouts/admin/utils/alert";
import { numberWithCommas } from "../../layouts/admin/utils/number";
import {
  addNewCartService,
  editCartService,
  getSingellCartsService,
} from "../../services/cart";
const AddCart = () => {
  const navigate = useNavigate();
  const { handleGetCarts } = useOutletContext();
  const location = useLocation();
  const editId = location.state?.editId;
  const [allProduct, setAllProduct] = useState([]);
  const [colors, setColors] = useState([]);
  const [guarantees, setGuarantees] = useState([]);
  const [selectedProductsInfo, setSelectedProductsInfo] = useState([]);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [reInitialValues, setReInitialValues] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handelGetProduct = async () => {
    const res = await getSingellCartsService(editId);
    let products = [];
    if (res.status == 200) {
      const cart = res.data.data;
      cart.items.map((i) => {
        products.push({
          id: i.id,
          product: i.product,
          guarantee: i.guarantee?.id || "",
          color: i.color?.id || "",
          guaranteeTitle: i.guarantee?.title,
          colorCode: i.color.code,
          count: i?.count,
        });
      });
    }
    setSelectedProductsInfo(products);
    setReInitialValues({ ...initialValues, user_id: res.data.data.user_id });
  };
  const handelAllProducts = async () => {
    const res = await getAllProductsService();
    res.status == 200 &&
      setAllProduct(
        res.data.data.map((p) => {
          return { name: p.title, value: p.id };
        })
      );
  };

  const handeChangeSelectedProduct = async (e, formik) => {
    formik.setFieldValue("product_id", e);
    const res = await getOneProductsService(e);
    if (res.status == 200) {
      const product = res.data.data;
      setCurrentProduct(product);
      setColors(product.colors.map((c) => ({ name: c.title, value: c.id })));
      setGuarantees(
        product.guarantees.map((g) => ({ name: g.title, value: g.id }))
      );
    }
  };
  useEffect(() => {
    editId && handelGetProduct();
    handelAllProducts();
  }, []);
  const handleConfirmAddCart = async (formik) => {
    setIsSubmitting(true)
    const userId = formik.values.user_id;
    let newProduct = [];
    for (const p of selectedProductsInfo) {
      newProduct.push({
        product_id: p.product.id,
        color_id: p.color,
        guarantee_id: p.guarantee,
        count: p.count,
      });
    }
    const value = {
      user_id: userId,
      products: newProduct,
    };
    if (editId) {
      const res = await editCartService(editId, value);
      if (res.status == 200) {
        Alert("انجام شد", res.data.message, "success");
        handleGetCarts();
        navigate(-1);
        setIsSubmitting(false)
      }
    } else {
      const res = await addNewCartService(value);
      if (res.status === 201) {
        Alert("انجام شد", res.data.message, "success");
        handleGetCarts();
        navigate(-1);
        setIsSubmitting(false)
      }
    }
  };

  const handleDeleteProduct = (id) => {
    setSelectedProductsInfo((old) => old.filter((o) => o.id != id));
  };
  return (
    <>
      <ModalContainer
        className="show d-block"
        id={"add_cart_modal"}
        title={editId ? "جرئیات و ویرایش سبد خرید" : "جزئیات و افزودن سبد خرید"}
        fullScreen={true}
        closeFunction={() => navigate(-1)}
      >
        <div className="">
          <Formik
            initialValues={reInitialValues || initialValues}
            onSubmit={(values, actions) =>
              onSubmit(actions, values, setSelectedProductsInfo, currentProduct)
            }
            validationSchema={validationSchema}
            enableReinitialize
          >
            {(formik) => {
              return (
                <Form>
                  <div className="row col-12 my-3 justify-content-center">
                    <div className="col-12 col-md-4 col-lg-2 my-1">
                      <Field
                        type="text"
                        name="user_id"
                        // disable={(selectedProductsInfo.length > 0).toString()}
                        className="form-control"
                        placeholder="آی دی مشتری"
                      />
                      <br />
                      <ErrorMessage name="user_id" component={FormikError} />
                    </div>

                    <div className="col-12 col-md-4 col-lg-2 my-1">
                      <SelectSearch
                        options={allProduct}
                        search={true}
                        placeholder="محصول"
                        onChange={(e) => handeChangeSelectedProduct(e, formik)}
                      />
                      <br />
                      <ErrorMessage name="allProduct" component={FormikError} />
                    </div>
                    <div className="col-12 col-md-4 col-lg-2 my-1">
                      <SelectSearch
                        options={colors}
                        search={true}
                        placeholder="رنگ"
                        onChange={(e) => {
                          formik.setFieldValue("color_id", e);
                        }}
                      />
                      <br />
                      <ErrorMessage name="colors" component={FormikError} />
                    </div>

                    <div className="col-12 col-md-4 col-lg-2 my-1">
                      <SelectSearch
                        options={guarantees}
                        search={true}
                        placeholder="گارانتی"
                        onChange={(e) =>
                          formik.setFieldValue("guarantee_id", e)
                        }
                      />
                      <br />
                      <ErrorMessage name="guarantees" component={FormikError} />
                    </div>
                    <div className="col-12 col-md-4 col-lg-2 my-1">
                      <Field
                        type="number"
                        name="count"
                        className="form-control"
                        placeholder="تعداد"
                      />
                      <br />
                      <ErrorMessage name="count" component={FormikError} />
                    </div>

                    <div className="col-4 col-lg-1 d-flex justify-content-center align-items-center my-1">
                      <div className="col-4 col-lg-1 d-flex justify-content-center align-items-center my-1">
                        <i
                          className="fas fa-check text-light bg-success rounded-circle p-2
                          mx-1 hoverable_text hoverable pointer has_tooltip hoverable_text"
                          title="ثبت فرم"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          onClick={() => formik.submitForm()}
                        ></i>
                      </div>
                    </div>
                    <hr className="mt-3" />
                  </div>
                  <div className="row justify-content-center">
                    {selectedProductsInfo.map((p) => (
                      <div className="col-12 col-md-6 col-lg-4" key={p.id}>
                        <div className="input-group my-3 dir_ltr">
                          <span className="input-group-text text-end font_08 w-100 text_truncate">
                            <i
                              className="fas fa-times text-danger hoverable_text pointer mx-1 has_tooltip"
                              title="حذف محصول از سبد"
                              data-bs-placement="top"
                              onClick={() => handleDeleteProduct(p.id)}
                            ></i>
                            {p.product.productName}
                            (قیمت واحد: {numberWithCommas(p.product.price)})
                            (گارانتی: {p?.guaranteeTitle}) ({p.count} عدد)
                            <i
                              className="fas fa-circle mx-1"
                              style={{ color: p?.colorCode }}
                            ></i>
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="col-12"></div>
                    {selectedProductsInfo.length > 0 ? (
                      <>
                        <div className="col-6">
                          <div className="input-group my-3 dir_ltr">
                            <span className="input-group-text justify-content-center w-75">
                              {numberWithCommas(
                                selectedProductsInfo
                                  .map((p) => p.count * p.product.price)
                                  .reduce((a, b) => a + b)
                              )}
                            </span>
                            <span className="input-group-text w-25 text-center">
                              {" "}
                              جمع کل{" "}
                            </span>
                          </div>
                        </div>
                        <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                          <button
                          disabled={isSubmitting}
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleConfirmAddCart(formik)}
                          >
                            {isSubmitting?"...صبر کنید":"دخیره"}
                            
                          </button>
                        </div>
                      </>
                    ) : (
                      <h6 className="text-center text-primary">
                        محصولات خود را مشخص کنید
                      </h6>
                    )}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalContainer>
    </>
  );
};

export default AddCart;
