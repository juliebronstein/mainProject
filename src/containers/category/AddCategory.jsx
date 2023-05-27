import React, { useContext, useEffect, useState } from "react";

import { Form, Formik } from "formik";
import FormikControl from "../../components/form/FormikControl";
import { SubmittingButton } from "../../components/SubmittingButton";
import { useParams } from "react-router-dom";
import { CategoryContex } from "../../context/categoryContext";
import { initialValues, onSubmit, validationSchema } from "./core";
import {
  getCategoriesService,
  getSingelCategoryService,
} from "../../services/category";
import { Alert } from "../../layouts/admin/utils/alert";
import ModalContainer from "../../components/ModalContainer";

export const AddCategory = ({ setForceRender,setForceRenderP,forceRenderP }) => {
  const { editeId, setEditeId } = useContext(CategoryContex);
  const params = useParams();
  const [reinitialValues, setReinitialValues] = useState(null);
  const [editeCategory, setEditeCategory] = useState(null);
  
  useEffect(() => {
    setEditeCategory(null);
    if (editeId) getSingelCategory();
  }, [editeId]);

  const getSingelCategory = async () => {
    try {
    
      const res = await getSingelCategoryService(editeId);
      if (res.status === 200 || res.status === 201) {
        setEditeCategory(res.data.data);
      
      }
    } catch {
      Alert("مشکل...!", "متاسفانه دسته بندی مورد نظر دریافت نشد", "warning");
    }
  }; 
  useEffect(() => {
    if (editeCategory) {
      setReinitialValues({
        parent_id: editeCategory.parent_id || "",
        title: editeCategory.title,
        descriptions: editeCategory.descriptions||"",
        image: null,
        is_active: editeCategory.is_active ? true : false,
        show_in_menu: editeCategory.show_in_menu ? true : false,
      });
 
    } else if (params.categoryId) {
      setReinitialValues({
        ...initialValues,
        parent_id: params.categoryId,
      });
    } else {
      setReinitialValues(null);
    }
  }, [params.categoryId, editeCategory]);

  const [parents, setParents] = useState([]);
  const handleGetParentsCategories = async () => {
    try {
      const res = await getCategoriesService();
      if (res.status === 200) {
        const allParents = res.data.data;
        setParents(
          allParents.map((p) => {
            return { id: p.id, value: p.title };
          })
        );
      }
    } catch (error) {
      Alert("مشکل...!", "متاسفانه دسته بندی های والد دریافت نشد", "warning");
    }
  };
  useEffect(() => {
    handleGetParentsCategories();
  }, [forceRenderP]);

  return (
    <>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_product_category_modal"
        onClick={() => {
          setEditeId(null)
        setEditeCategory(null)
        }}
      >
        <i className="fas fa-plus text-light"></i>
      </button>
      <ModalContainer
      title={
        editeId
          ? "ویرایش : " + (editeCategory ? editeCategory.title : "")
          : "افزودن دسته محصولات"
      }
        id="add_product_category_modal"
        fullscreen="fullscreen"
      >
        <Formik
          initialValues={reinitialValues || initialValues}
          onSubmit={(values, actions) => {
            onSubmit(values, actions, setForceRender,editeId,setEditeCategory,setParents,setForceRenderP);
          }}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form>
            <div className="container">
              <div className="row justify-content-center">
                {parents.length ? 
                  <FormikControl
                    className="col-md-6 col-lg-8"
                    control="select"
                    options={parents}
                    name="parent_id"
                    label="دسته والد"
                    firstitem="دسته والد را انتخاب کنید..."
                  /> : null}
                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="text"
                  name="title"
                  label="عنوان دسته"
                  placeholder="عنوان دسته"
                />
                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="textarea"
                  name="descriptions"
                  label="توضیحات"
                  placeholder="توضیحات"
                />
                {!editeId ? (
                  <FormikControl
                    className="col-md-6 col-lg-8"
                    control="file"
                    name="image"
                    label="تصویر"
                    placeholder="تصویر"
                  />
                ) : (
                  ""
                )}
                <div className="col-12 col-md-6 col-lg-8 row justify-content-center">
                  <div className="col-12 col-md-4 col-lg-3 mx-lg-5">
                    <FormikControl
                      control="switch"
                      name="is_active"
                      label="وضعیت فعال"
                    />
                  </div>
                  <div className="col-12 col-md-4 col-lg-3 mx-lg-5">
                    <FormikControl
                      control="switch"
                      name="show_in_menu"
                      label="نمایش در منو"
                    />
                  </div>
                </div>
                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                  <SubmittingButton tittle={"ذخیره"} />
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </ModalContainer>
    </>
  );
};
