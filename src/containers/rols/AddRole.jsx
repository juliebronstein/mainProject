import React, { useEffect, useState } from "react";
import ModalContainer from "../../components/ModalContainer";
import FormikControl from "../../components/form/FormikControl";
import { Form,Formik } from "formik";
import { initialValues, onSubmit, validationSchema } from "./core";
import { getAllPermissions } from "../../services/role";
import { SubmittingButton } from "../../components/SubmittingButton";

const AddRole = () => {
    const [reInitialValues, setReInitialValues] = useState(null)
    const [initialPermision, setInitialPermision] = useState([])
    const [editRole, seteditRole] = useState(null)
    const getAllPermission=async()=>{
        try{
            const res=await getAllPermissions()
            if(res.status==200)
            console.log(res.data.data)
            // setInitialPermision(res.data.data.map(i=>({id:i.id,value:i.title})))
        }catch(err){}
    }
    useEffect(() => {
      getAllPermission()
    }, [])
    
  return (
    <>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_role_modal"
      >
        <i className="fas fa-plus text-light"></i>
      </button>
      <ModalContainer
        id={"add_role_modal"}
        title={"افزودن نقش کاربر"}
        fullScreen={false}
      >
        <div className="container">
          <div className="row justify-content-center">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(actions, values) => onSubmit(actions, values)}
            >
              {(formik) => {
                return (
                  <Form>
                  <>
                    <FormikControl
                      label="عنوان نقش"
                      control="input"
                      type="text"
                      name="title"
                      placeholder="عنوان نقش"
                    />
                    <FormikControl
                  label="توضیحات نقش"
                  control="textarea"
                  name="description"
                  placeholder="توضیحات نقش"
                />

                <SubmittingButton tittle="ذخیره"/>
                </>
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

export default AddRole;
