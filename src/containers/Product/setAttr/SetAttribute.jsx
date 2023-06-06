import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, Formik } from "formik";
import { PrevPageButton } from "../../../components/PrevPageButton";
import FormikControl from "../../../components/form/FormikControl";
import { SubmittingButton } from "../../../components/SubmittingButton";
import SpinnerLoad from "../../../components/SpinnerLoad";
import * as Yup from "yup";
import { initData, onSubmit } from "./core";
const SetAttribute = () => {
  const location = useLocation();
  const { selectedProduct } = location.state;
  // console.log("selectedProduct",selectedProduct);
  const [attrs, setAttrs] = useState();
  const [initialValues, setInitialValues] = useState(null);
  const [validationSchema, setValidationSchema] = useState({});

  const handleGetAttributes = async () => {
    const { attrval, initial, validate } = await initData(selectedProduct);
    setInitialValues(Object.keys(initial).length > 0 ? initial : {});
    setValidationSchema(
      Object.keys(validate).length > 0 ? Yup.object(validate) : {}
    );
    setAttrs(attrval);
  };
  useEffect(() => {
    handleGetAttributes();
  }, []);

  return (
    //  <div className="text-center row justify-content-center">
    <div className="row justify-content-center ">
      <div className="text-left col-md-6 col-lg-8 m-auto my-3 text-left">
        <PrevPageButton />
      </div>
      <h4 className="text-center my-3">
        {" "}
        نام محصول:{" "}
        <span className="text-primary"> {selectedProduct.title}</span>{" "}
      </h4>

      <div className=" margin-50">
        {initialValues ? (
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) =>
              onSubmit(values, actions, selectedProduct.id)
            }
            validationSchema={validationSchema}
          >
            {(formik) => {
              return (
                <Form>
                  {attrs.map((attr, index) => (
                    <div
                      key={attr.id + "-attr" + index}
                      className="col-12 col-md-6 col-lg-8"
                    >
                      <span className="text-center my-3">
                        {attr.groupTitle}{" "}
                      </span>
                      {attr.data.length > 0 ? (
                        attr.data?.map((i, index) => (
                          <div
                            className="justify-content-center"
                            key={index + "i-" + i.id}
                          >
                            <FormikControl
                              label={i.title}
                              className="col-md-6 col-lg-8 "
                              control="input"
                              type="text"
                              name={i.id}
                              placeholder=""
                              additionalField={i.unit}
                            />
                          </div>
                        ))
                      ) : (
                        <span className="text-center text-danger">
                          {" "}
                          هیچ ویژگی برای این دسته بندی ثبت نشده است{" "}
                        </span>
                      )}
                    </div>
                  ))}

                  <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                    <SubmittingButton tittle="ذخیره" />
                  </div>
                </Form>
              );
            }}
          </Formik>
        ) : (
          <SpinnerLoad colorClass="text-primary" />
        )}
      </div>
    </div>
    // </div>
  );
};

export default SetAttribute;
