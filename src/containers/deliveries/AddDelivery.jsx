import React, { useEffect, useState } from "react";
import ModalContainer from "../../components/ModalContainer";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { getSindleDeliveryServise } from "../../services/delivery";
import { Form, Formik } from "formik";
import { initialValues, onSubmit, validationSchema } from "./core";
import FormikControl from "../../components/form/FormikControl";
import { SubmittingButton } from "../../components/SubmittingButton";

const AddDelivery = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const editId = location.state?.editId;
  const [reInitialValues, setReInitialValues] = useState(null);

  const { setData } = useOutletContext();
  const handelGetEditItem = async () => {
    try {
      const res = await getSindleDeliveryServise(editId);
      if (res.status == 200) {
        setReInitialValues(res.data.data);
      
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (editId) {
      handelGetEditItem();
    }
  }, [editId]);

  return (
    <>
      <ModalContainer
        className="show d-block"
        id={"add_delivery_modal"}
        title={
            editId
            ? `ویرایش اطلاعات ارسال ${reInitialValues?.title}`
            : "افزودن روش ارسال"
        }
        fullScreen={false}
        closeFunction={() => {
          navigation(-1);
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <Formik
              initialValues={reInitialValues || initialValues}
              onSubmit={(values, actions) => {
                onSubmit(values, actions, setData,editId);
              }}
              validationSchema={validationSchema}
              enableReinitialize
            >
              {(formik) => {
                return (
                  <Form>
                    <FormikControl
                      label="عنوان ارسال"
                      className={"col-12"}
                      control="input"
                      type="text"
                      name="title"
                      placeholder="فقط از حروف فارسی و لاتین استفاده نمایید"
                    />
                    <FormikControl
                      label="مدت ارسال"
                      className={"col-12"}
                      control="input"
                      type="number"
                      name="time"
                      placeholder="مدت ارسال"
                    />
                    <FormikControl
                      label="واحد ارسال"
                      className={"col-12"}
                      control="input"
                      type="text"
                      name="time_unit"
                      placeholder="واحد ارسال"
                    />
                    <FormikControl
                      label="هرینه ارسال"
                      className={"col-12"}
                      control="input"
                      type="number"
                      name="amount"
                      placeholder="فقط از اعداد استفاده کنید"
                    />
                    <SubmittingButton tittle="ذخیره"/>
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

export default AddDelivery;
