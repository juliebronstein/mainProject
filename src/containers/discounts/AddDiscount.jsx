import React, { useEffect, useState } from "react";
import ModalContainer from "../../components/ModalContainer";
import { useLocation, useNavigate } from "react-router-dom";
import FormikControl from "../../components/form/FormikControl";
import { Form, Formik } from "formik";
import { getAllProductsService } from "../../services/product";
import { initialValues, onSubmit, validationSchema } from "./core";
const AddDiscount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const discountSelected = location.state?.discountSelected;
  console.log(discountSelected);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const handelGetProducts = async () => {
    try {
      const res = await getAllProductsService();
      if (res.status === 200){
        const data=res.data.data
          setProducts(
            data.map(i=>{
              console.log("id:",i.id,"value:",i.title)
              return{id:i.id,value:i.title}
            })
          )
      }
    } catch (err) {
    } finally {
    }
  };
  useEffect(() => {
    handelGetProducts();
    console.log(products);
  }, []);

  const reinitialValues = {};
  return (
    <>
      <ModalContainer
        className="show d-block animate__animated animate__fadeInDown animate__backOutDown animate__fast"
        id={"add_discount_modal"}
        title={"افزودن کد تخفیف"}
        fullscreen={false}
        closeFunction={() => navigate(-1)}
      >
        <div className="container">
          <div className="row justify-content-center">
            <Formik
              initialValues={reinitialValues || initialValues}
              onSubmit={(values, actions) => {
                onSubmit(values, actions);
              }}
              validationSchema={validationSchema}
              enableReinitialize
            >
             
                {formik => {
                  return ( 
                  <Form>
                <>
                  <FormikControl
                    className="col-12 "
                    control="input"
                    type="text"
                    name="title"
                    label="عنوان تخفیف"
                    placeholder="کیبرد را در حالت فارسی قرار دهید"
                  />
                  <FormikControl
                    className="col-12 "
                    control="input"
                    type="text"
                    name="code"
                    label="کد تخفیف"
                    placeholder="کیبرد را در حالت لاتین قرار دهید"
                  />
                  <FormikControl
                    className="col-12 "
                    control="input"
                    type="text"
                    name="precent"
                    label="درصد تخفیف"
                    placeholder="فقط عدد "
                  />
                  <FormikControl
                    className="col-12 "
                    control="input"
                    type="text"
                    name="expire_at"
                    label="تاریخ اعتبار"
                    placeholder=""
                  />
                  <div className="col-6 margin-20">
                    <FormikControl
                      label="وضعیت فعال"
                      className="form-check form-switch col-md-6 col-lg-8 col-md-2"
                      control="switch"
                      name="for_all"
                    />
                  </div>
                  {!formik.values.for_all? <FormikControl
                  label="رنگ"
                  resultType="obj"
                  className="col-12"
                  control="searchableselect"
                  options={typeof colors == "object" ? products : []}
                  name="products"
                  firstItem="محصولات مورد نظر را انتخاب کنید..."
                  initialItems={selectedProducts}
                /> : null}
                  

                 
                </> </Form>
                  );
                 }}
             
            </Formik>
          </div>
        </div>
      </ModalContainer>
    </>
  );
};

export default AddDiscount;
