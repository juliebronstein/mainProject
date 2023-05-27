import React from 'react'

import { SubmittingButton } from "../../../components/SubmittingButton";
import FormikControl from "../../../components/form/FormikControl";
import { initialValues, onSubmit, validationSchema } from "./core";
import { Form, Formik } from "formik";
export const AddAttr = ({editeAttr,setEditeAttr,location,setData,reinitialValues}) => {
  return (
    <>
                  <Formik
          onSubmit={(values, actions) => {
            onSubmit(
              values,
              actions,
              location.state.categoryData.id,
              setData,
              editeAttr,
              setEditeAttr,
            
            );
          }}
          initialValues={reinitialValues || initialValues}
          validationSchema={validationSchema}
          enableReinitialize
        >     
           <Form>
       <div
                  className={`row my-3 ${
                    editeAttr ? "alert-danger danger-shadow" : ""
                  } justify-content-center align-item-center is-inline`}
                >
                  {/* <div className="col-12 col-md-6 col-lg-4 my-1"> */}
                  <FormikControl
                    className="ol-12 col-md-6 col-lg-4 my-1"
                    control="input"
                    type="text"
                    name="title"
                    label="عنوان"
                    placeholder="عنوان ویژگی جدید"
                  />
                  <FormikControl
                    className="ol-12 col-md-6 col-lg-4 my-1"
                    control="input"
                    type="text"
                    name="unit"
                    label="واحد"
                    placeholder="واحد ویژگی جدید"
                  />
                  <div className="col-8 col-lg-2 my-1">
                    <div className="form-check form-switch d-flex justify-content-center align-items-center p-0 h-100">
                      <FormikControl
                        control="switch"
                        name="in_filter"
                        label="نمایش در فیلتر"
                      />
                    </div>
                  </div>

                  <div className="col-4 col-lg-2 d-flex justify-content-center align-items-start my-1">
                    {editeAttr ? (
                      <button
                        className="btn btn-sm btn-secondary ms-2"
                        type="button"
                        onClick={() => {
                          setEditeAttr(null);
                        }}
                      >
                        {"انصراف"}
                      </button>
                    ) : null}
                    <SubmittingButton tittle={"ذخیره"} />
                  </div>
                </div>
                </Form>
        </Formik>
    </>
  )
}
