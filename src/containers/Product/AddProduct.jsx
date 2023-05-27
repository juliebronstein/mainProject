import React, { useEffect, useState } from "react";

import { Form, Formik } from "formik";
import FormikControl from "../../components/form/FormikControl";
import { initialValues, onSubmit, validationSchema } from "./core";
import { getCategoriesService } from "../../services/category";
import SpinnerLoad from "../../components/SpinnerLoad";
import { PrevPageButton } from "../../components/PrevPageButton";
export const AddProduct = () => {
  const [parentCategories, setParentCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  //const [selectedCategories, setSelectedCategories] = useState([]);
  //const [selectedBrands, setSelectedBrands] = useState([]);
  const [reInitialValues, setReInitialValues] = useState(null);
  useEffect(() => {
    handleGetCategory();
  }, []);

  const handleGetCategory = async () => {
    const res = await getCategoriesService();
    if ((res.status = 200)) {
      const datacat = res.data.data;
      setParentCategories(
        datacat.map((i) => {
          return { id: i.id, value: i.title };
        })
      );
    }
  };

  const handelSetMaincategories = async (value) => {
    setMainCategories("waiting...");
    if (value > 0) {
      const res = await getCategoriesService(value);
      if ((res.status = 200)) {
        const data = res.data.data;
        setMainCategories(
          data.map((i) => {
            return { id: i.id, value: i.title };
          })
        );
      }
    } else {
      setMainCategories([]);
    }
  };

  // const handelSelectCategories = (value, formik) => {
  //   const item = mainCategories.filter((i) => i.id == value)[0];
  //   if (item) {
  //     setSelectedCategories((old) => {
  //       if (old.findIndex((i) => i.id == value) == -1) {
  //         const newData = [...old, item];
  //         const selectedIds = newData.map((i) => i.id);
  //         formik.setFieldValue("category_ids", selectedIds.join("-"));
  //         return newData;
  //       } else return old;
  //     });
  //   }
  // };

  // const handelRemovefromDelectedCatd = (id, formik) => {
  //   setSelectedCategories((old) => {
  //     const newselected = old.filter((i) => i.id != id);
  //     const selectedIds = newselected.map((i) => i.id);
  //     formik.setFieldValue("category_ids", selectedIds.join("-"));
  //     return newselected;
  //   });
  // };

  return (
    <>
      <Formik
        initialValues={reInitialValues || initialValues}
        onSubmit={(values, actions) => onSubmit(values, actions)}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <div className="row justify-content-center ">
                <h4 className="text-center my-3">افزودن محصول جدید</h4>
                <div className="text-left col-md-6 col-lg-8 m-auto my-3 text-left">
                  <PrevPageButton />
                </div>
                {parentCategories.length ? (
                  <FormikControl
                    className="col-md-6 col-lg-8"
                    control="select"
                    options={parentCategories}
                    name="parentsCats"
                    label="دسته اصلی"
                    firstitem="دسته اصلی مورد نظر را انتخاب کنید..."
                    handelOnChange={handelSetMaincategories}
                  />
                ) : null}
                {mainCategories === "waiting..." ? (
                  <SpinnerLoad isSmall={true} colorClass="text-primary" />) : null  }
                  <FormikControl
                    resultType="string"
                    className="col-md-6 col-lg-8"
                    control="searchableselect"
                    options={typeof(mainCategories)=='object'? mainCategories:[]}
                    name="category_ids"
                    firstitem="دسته مورد نظر را انتخاب کنید..."
                    label="دسته"
                    // setSelected={setSelectedCategories}
                    // selectetd={selectedCategories}
                  />
              
                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="text"
                  name="title"
                  label="عنوان"
                  placeholder="عنوان محصول"
                />
                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="text"
                  name="price"
                  label="قیمت"
                  placeholder="قیمت محصول"
                 
                />
                <FormikControl
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="text"
                  name="weight"
                  label="وزن"
                  placeholder="وزن محصول (کیلوگرم)"
                 
                />

                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group mb-3 dir_ltr">
                    <span className="input-group-text justify-content-center">
                      <i className="fas fa-plus text-success hoverable_text pointer"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="قسمتی از نام برند را وارد کنید"
                      list="brandLists"
                    />
                    <span className="input-group-text w_6rem justify-content-center">
                      برند
                    </span>
                    <datalist id="brandLists">
                      <option value="سامسونگ" />
                      <option value="سونی" />
                      <option value="اپل" />
                    </datalist>
                  </div>
                </div>



                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group mb-2 dir_ltr">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="قسمتی از نام رنگ را وارد کنید"
                      list="colorList"
                    />
                    <datalist id="colorList">
                      <option value="مشکی" />
                      <option value="سفید" />
                      <option value="قرمز" />
                    </datalist>
                    <span className="input-group-text w_6rem justify-content-center">
                      رنگ
                    </span>
                  </div>
                  <div className="col-12 col-md-6 col-lg-8 mb-3 d-flex">
                    <span
                      className="color_tag chips_elem d-flex justify-content-center align-items-center pb-2"
                      style={{ background: "#000" }}
                    >
                      <i className="fas fa-times text-danger hoverable_text"></i>
                    </span>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group mb-2 dir_ltr">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="قسمتی از نام گارانتی را وارد کنید"
                      list="guarantiList"
                    />
                    <datalist id="guarantiList">
                      <option value="گارانتی فلان 1" />
                      <option value="گارانتی فلان 2" />
                      <option value="گارانتی فلان 3" />
                    </datalist>
                    <span className="input-group-text w_6rem justify-content-center">
                      گارانتی
                    </span>
                  </div>
                  <div className="col-12 col-md-6 col-lg-8 mb-3">
                    <span className="chips_elem">
                      <i className="fas fa-times text-danger"></i>
                      گارانتی فلان
                    </span>
                    <span className="chips_elem">
                      <i className="fas fa-times text-danger"></i>
                      گارانتی فلان
                    </span>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group mb-3 dir_ltr">
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="توضیحات"
                      rows="5"
                    ></textarea>
                    <span className="input-group-text w_6rem justify-content-center">
                      توضیحات
                    </span>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group mb-3 dir_ltr">
                    <input
                      type="file"
                      className="form-control"
                      placeholder="تصویر"
                    />
                    <span className="input-group-text w_6rem justify-content-center">
                      تصویر
                    </span>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group mb-3 dir_ltr">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="یک کلمه در مورد تصویر"
                    />
                    <span className="input-group-text w_6rem justify-content-center">
                      توضیح تصویر
                    </span>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group mb-3 dir_ltr">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="با - از هم جدا شوند"
                    />
                    <span className="input-group-text w_6rem justify-content-center">
                      تگ ها
                    </span>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group mb-3 dir_ltr">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="فقط عدد"
                    />
                    <span className="input-group-text w_6rem justify-content-center">
                      موجودی
                    </span>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group mb-3 dir_ltr">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="فقط عدد "
                    />
                    <span className="input-group-text w_6rem justify-content-center">
                      درصد تخفیف
                    </span>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-8 row justify-content-center">
                  <div className="form-check form-switch col-5 col-md-2">
                    <input
                      className="form-check-input pointer"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                    />
                    <label
                      className="form-check-label pointer"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      وضعیت فعال
                    </label>
                  </div>
                </div>
                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                  <button className="btn btn-primary ">ذخیره</button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
