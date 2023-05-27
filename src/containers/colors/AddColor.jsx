import React, {  useEffect, useState } from "react";

import ModalContainer from "../../components/ModalContainer";
import { Form, Formik } from "formik";
import FormikControl from "../../components/form/FormikControl";
import { SubmittingButton } from "../../components/SubmittingButton";
import { initialValues, onSubmit, validationSchema } from "./core";
import { getSindleColorServise } from "../../services/color";

// import { colorContex } from "../../context/colorContext";

const AddColor = ({ setData, editeColorId, setEditeColorId }) => {
  const [reinitialValues, setReinitialValues] = useState(null);
  const [editeColor, setEditeColor] = useState(null);
// const {editeIdctx,setEditeIdctx}=useContext(colorContex)

  useEffect(() => {
    setEditeColor(null)
    if (editeColorId) handleSingleColor();
    else setEditeColor(null);
  }, [editeColorId]);

  useEffect(() => {
    if (editeColor) {
      setReinitialValues({
        title: editeColor.title,
        code: editeColor.code,
      });
    } else setReinitialValues(null);
  }, [editeColor]);

  const handleSingleColor = async () => {
    try {
      const res = await getSindleColorServise(editeColorId);
      if ((res.status = 200)) {
        setEditeColor(res.data.data);
      }
    } catch (err) {}
  };
 

  return (
    <>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_color_modal"
        onClick={()=>setEditeColorId(null)}
      >
        <i className="fas fa-plus text-light"></i>
      </button>
      <ModalContainer
        fullScreen={false}
        id={"add_color_modal"}
        title={editeColor ? "ویرایش رنگ" : "افزودن رنگ جدید"}
      >
        <div className="container">
          <div className="row justify-content-center">
            {" "}
            <Formik
              initialValues={reinitialValues || initialValues}
              onSubmit={(values, actions) => { onSubmit(values, actions, setData, setEditeColor, editeColor);  }}
              validationSchema={validationSchema}
              enableReinitialize
            >
              <Form>
                <FormikControl
                  className="input-group my-3 dir_ltr"
                  control="input"
                  type="text"
                  name="title"
                  label="نام رنگ"
                  placeholder="نام رنگ"
                />
                <FormikControl
                  className="input-group my-3 dir_ltr"
                  control="input"
                  type="color"
                  name="code"
                  label="کدرنگ"
                  placeholder="انتخاب رنگ"
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

export default AddColor;
