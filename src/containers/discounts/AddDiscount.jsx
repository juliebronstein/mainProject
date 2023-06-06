import React, { useEffect, useState } from "react";
import ModalContainer from "../../components/ModalContainer";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import FormikControl from "../../components/form/FormikControl";
import { Form, Formik } from "formik";
import { getAllProductsService } from "../../services/product";
import { SubmittingButton } from "../../components/SubmittingButton";
import { initialValues, onSubmit, validationSchema } from "./core";
import ConvertDate, { convertDateToJalali } from "../../layouts/admin/utils/ConvertDate";
const AddDiscount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const discountSelected = location.state?.discountSelected;
  console.log(discountSelected);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [reinitialValues, setReinitialValues] = useState(null)
  const {setData}=useOutletContext()


  
  const handelGetProducts = async () => {
    try {
      const res = await getAllProductsService();
      if (res.status === 200) {
        const data = res.data.data;
        setProducts(data.map((i) => {return { id: i.id, value: i.title }}));
      }
    } catch (err) {
    } finally {
    }
  };

  const handelSetProductsSelectBox = (formik) => {
    const idsArr = formik.values.product_ids?.split("-").filter((id) => id);
    const selectedAttr = idsArr?.map(
      (id) => products?.filter((p) => p.id == id)[0]
    )?.filter(i=>i)
    return (
      <FormikControl
        className="animate__animated animate__shakeX"
        label="برای"
        control="searchableselect"
        options={products}
        name="product_ids"
        firstItem="محصول مورد نظر را انتخاب کنبد..."
        resultType="string"
        initialItems={
          selectedAttr?.length > 0 ? selectedAttr : selectedProducts
        }
      />
    );
  };
  useEffect(() => {
    handelGetProducts();
    if (discountSelected) {
      setSelectedProducts(discountSelected.products.map((i) => {return { id: i.id, value: i.title }}));
      const productIds=discountSelected.products?.map(i=>i.id).join("-")
      setReinitialValues(
        {...discountSelected,
      expire_at:convertDateToJalali(discountSelected.expire_at,'jD/jM/jYYYY'),
      for_all:discountSelected.for_all?true:false,
      product_ids:productIds,
      })
    
    }
    else{
      setReinitialValues(null)
    }
  }, []);

  return (
    <>
      <ModalContainer
        className="show d-block"
        id={"add_discount_modal"}
        title={discountSelected?<> ویرایش <span className="text-primary">{discountSelected.title} </span> </> : "افزودن کد تخفیف"}
        fullscreen={false}
        closeFunction={() => navigate(-1)}
      >
        <div className="container">
          <div className="row justify-content-center">
            <Formik
              initialValues={reinitialValues||initialValues}
              onSubmit={(values, actions) =>  onSubmit(values, actions,discountSelected,setData) }
              validationSchema={validationSchema}
              enableReinitialize
            >
              {(formik) => {
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
                        type="number"
                        name="percent"
                        label="درصد تخفیف"
                        placeholder="فقط عدد "
                      />
                      <FormikControl
                        control="date"
                        name="expire_at"
                        label="تاریخ اعتبار"
                        formik={formik}
                        yearsLimit={{ from: 10, to: 10 }}
                        initialDate={ discountSelected?.expire_at ||undefined}
                      />
                      <div className="col-6 margin-20">
                        <FormikControl
                          label="برای همه"
                          className="form-check form-switch col-md-6 col-lg-8 col-md-2"
                          control="switch"
                          name="for_all"
                        />
                      </div>
                      {
                      !formik.values.for_all ? handelSetProductsSelectBox(formik): null
                      }
                      <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                  <SubmittingButton tittle={"ذخیره"} /> 
                </div>
                    </>{" "}
                  </Form>
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
