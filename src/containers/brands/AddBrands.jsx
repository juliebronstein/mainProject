import React, { useEffect, useState } from "react";
import ModalContainer from "../../components/ModalContainer";
import { Form, Formik } from "formik";
import FormikControl from "../../components/form/FormikControl";
import { SubmittingButton } from "../../components/SubmittingButton";

import { apiPath } from "../../services/httpService";
import { initialValues, onSubmit, validationSchema } from "./core";
const AddBrands = ({ editeBrand, setEditeBrand, setForceRender, setData }) => {
  const [reinitialValues, setReinitialValues] = useState(null);
 

  useEffect(() => {
    if (editeBrand) setReinitialValues(editeBrand);
    else setReinitialValues(null);
  }, [editeBrand]);

  return (
    <>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_brand_modal"
        onClick={() => {
          setEditeBrand(null);
          
        }}
      >
        <i className="fas fa-plus text-light"></i>
      </button>
      <ModalContainer
        id={"add_brand_modal"}
        title={
          editeBrand ? `ویرابش بند ${editeBrand.persian_name}` : "افزودن برند"
        }
        fullScreen={false}
      >
        <div className="container">
          <div className="row justify-content-center">
            <Formik
              initialValues={reinitialValues || initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, actions) =>
                onSubmit(values, actions, editeBrand, setEditeBrand,setData,setForceRender)
              }
              enableReinitialize
            >
              <Form>
                <FormikControl
                  control="input"
                  type="text"
                  name="original_name"
                  label="عنوان لاتیتن"
                  placeholder="کیبرد را در حالت لاتین قرار دهید"
                />
                <FormikControl
                  control="input"
                  type="text"
                  name="persian_name"
                  label="عنوان فارسی"
                  placeholder="کیبرد را در حالت فارسی قرار دهید"
                />
                <FormikControl
                  control="input"
                  type="text"
                  name="descriptions"
                  label="توضیحات"
                  placeholder="متن کوتاه در مورد برند"
                />
                {editeBrand ? (
                  editeBrand.logo ? (
                    <div className="input-group mb-3 justify-content-center">
                    <img
                      src={apiPath + "/" + editeBrand.logo}
                      alt="logo"
                      width="150"
                    />
                    </div>
                  ) : null
                ) : (
                  null
                )}
             <FormikControl
                    control="file"
                    name="logo"
                    label="تصویر"
                    placeholder="کیبرد را در حالت لاتین قرار دهید"
                  />
                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                  <SubmittingButton tittle={"ذخیره"} /> 
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </ModalContainer>
    </>
  );
};

export default AddBrands;
