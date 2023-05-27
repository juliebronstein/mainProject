import React, { useEffect, useState } from "react";
import ModalContainer from "../../components/ModalContainer";
import { Form, Formik } from "formik";

import FormikControl from "../../components/form/FormikControl";

import { SubmittingButton } from "../../components/SubmittingButton";
import { getSindleGuarantyServise } from "../../services/guaranties";
import { initialValues, onSubmit, validationSchema } from "./core";
const AddGuaranty = ({ editeGuarantyId, setEditeGuarantyId, setData }) => {
  const [reInitialValues, setReInitialValues] = useState(null);
  const [editeItem, setEditeItem] = useState(null);
 // const handelEnter=(e)=>{
  //   if (e.key === 'Enter') {
  //     console.log(e);
  //   console.log(e.target.value)
  //   }
    
  // }
  useEffect(() => {
    if (editeGuarantyId) {
      handlGeteoneGuaranty();
    } else setReInitialValues(null);
  }, [editeGuarantyId]);

  useEffect(() => {
    if(editeItem)
    setReInitialValues({
      title:editeItem.title|| "",
    descriptions: editeItem.descriptions||   "",
    length: editeItem.length || 0,
    length_unit:editeItem.length_unit|| "",
    });
    
  }, [editeItem])
  
  const handlGeteoneGuaranty = async () => {
    try {
      const res = await getSindleGuarantyServise(editeGuarantyId);
      if ((res.status = 200)){ setEditeItem(()=>res.data.data);}
      
      
    } catch (err) {}
  };

  return (
    <>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_guarantee_modal"
        onClick={() => setEditeGuarantyId(null)}
      >
        <i className="fas fa-plus text-light"></i>
      </button>
      <ModalContainer
        id={"add_guarantee_modal"}
        title={
          editeItem
            ? "ویرایش : " 
             +  editeItem.title
            :         "افزودن گارانتی"

        }
        fullScreen={false}
      >
        <div className="container">
          <div className="row justify-content-center">
            <Formik
              onSubmit={(values,actions) => {
                onSubmit(
                    values,
                  actions,
                  setData,
                  editeItem,
                  setEditeItem
                );
              }}
              initialValues={reInitialValues || initialValues}
              validationSchema={validationSchema}
              enableReinitialize
            >
              <Form>
                <FormikControl
                  className="input-group my-3 dir_ltr"
                  control="input"
                  type="text"
                  name="title"
                  label="عنوان گارانتی"
                  placeholder="عنوان گارانتی"
                />
                <FormikControl
                  className="input-group my-3 dir_ltr"
                  control="input"
                  type="text"
                  name="descriptions"
                  label="توضیحات"
                  placeholder="توضیحات گارانتی"
                />
                <FormikControl
                  className="input-group my-3 dir_ltr"
                  control="input"
                  type="text"
                  name="length_unit"
                  label="واحد"
                  placeholder="واحد زمانی"
                />
              
                <FormikControl
                  className="input-group my-3 dir_ltr"
                  control="input"
                  type="number"
                  name="length"
                  label="مدت گارانتی"
                  placeholder="fff"
                />
                             {/* <FormikControl
                  control="inputenter"
                  type="text"
                  name="title"
                  label="عنوان لاتیتن"
                  placeholder="کیبرد را در حالت لاتین قرار دهید"
                  handelEnter={handelEnter}
                /> */}
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

export default AddGuaranty;
