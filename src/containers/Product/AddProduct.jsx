import React, { useEffect, useState } from "react";

import { Form, Formik } from "formik";
import FormikControl from "../../components/form/FormikControl";
import { initialValues, onSubmit, validationSchema } from "./core";
import { getCategoriesService } from "../../services/category";
import SpinnerLoad from "../../components/SpinnerLoad";
import { PrevPageButton } from "../../components/PrevPageButton";
import { getAllBrandsService } from "../../services/brands";
import { getAllColorsService } from "../../services/color";
import { getAllGuarantysService } from "../../services/guaranties";
import { SubmittingButton } from "../../components/SubmittingButton";
import AddBrands from "../brands/AddBrands";
import { useLocation } from "react-router-dom";
export const AddProduct = () => {
  const location = useLocation();
  const productEdit=location.state?.productEdit
  const [parentCategories, setParentCategories] = useState([]);
  const [forceRender, setForceRender] = useState(1000);
  const [mainCategories, setMainCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [guarantee, setGuarantee] = useState([]);
  const [reInitialValues, setReInitialValues] = useState(null);
  const [selecteKeyW, setSelectedKeyw] = useState([]) //use in edit
  const [selectedColor, setSelectedColor] = useState([]) //use in edit
  const [selectedCategory, setSelectedCategory] = useState([]) //use in edit
  const [selectedGuarantees, setSelectedGuarantees] = useState([]) //use in edit

  const initialeditvalue=()=>{
    if(productEdit){
      setSelectedCategory(productEdit.categories.map((ct) => {return{id:ct.id,value:ct.title}} ) )
      setSelectedColor(productEdit.colors.map((c) => {return{id:c.id,value:c.title}} ) )
      setSelectedGuarantees(productEdit.guarantees.map((g) => {return{id:g.id,value:g.title}} ) )
      setSelectedKeyw(productEdit.keywords.split("-"))//for enterinput
          }
  }
 
  useEffect(() => {
    handleGetCategory();
    handelBrands();
    handelColors();
    handelGuarantees();
    initialeditvalue()
    for(const key in productEdit)
    if(productEdit[key]==null)productEdit[key]=""
    productEdit?
    setReInitialValues(
  { ...productEdit,
      is_active:productEdit.is_active?true:false,
      category_ids:productEdit.categories.map((i) => i.id).join("-"),
      color_ids:productEdit.colors.map((i) => i.id).join("-"),
      guarantee_ids:productEdit.guarantees.map((i) => i.id).join("-"),
    }
      
    ):setReInitialValues(null)
    
    
  }, [forceRender,productEdit]);

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
  const handelBrands = async () => {
    try {
      const res = await getAllBrandsService();
      if (res.status === 200) {
        const data = res.data.data;

        setBrands(
          data.map((i) => {
            return {
              id: i.id,
              value: i.persian_name,
            };
          })
        );
      }
    } catch (err) {}
  };
  const handelColors = async () => {
    try {
      const res = await getAllColorsService();
      if (res.status ===200) {
        const data = res.data.data;
        setColors(
          data.map((i) => {
            return {
              id: i.id,
              value: i.title,
            };
          })
        );
      }
    } catch (err) {}
  };

  const handelGuarantees = async () => {
    try {
      const res = await getAllGuarantysService();
      if (res.status === 200) {
        const data = res.data.data;
        setGuarantee(
          data.map((i) => {
            return {
              id: i.id,
              value: i.title,
            };
          })
        );
      }
    } catch (err) {}
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
        onSubmit={(values, actions) => onSubmit(values, actions,productEdit)}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <div className="row justify-content-center">
                <h4 className="text-center my-3">
                  {productEdit?
                  <>
                  ویرایش محصول:
                  <span className="text-primary" >{productEdit.title}</span>
                  </>                  
                  :" افزودن محصول جدید"}
                  </h4>
                <div className="text-left col-md-6 col-lg-8 m-auto my-3 text-left">
                  <PrevPageButton />
                </div>
                {parentCategories.length ? (
                  <FormikControl
                  label="دسته اصلی"
                  name="parentsCats"
                    className="col-md-6 col-lg-8"
                    control="select"
                    options={parentCategories}
                    firstItem="دسته اصلی مورد نظر را انتخاب کنید..."
                    handleOnchange={handelSetMaincategories}
                  />
                ) : null}
                {mainCategories === "waiting..." ? (
                  <SpinnerLoad isSmall={true} colorClass="text-primary" />
                ) : null}
                <FormikControl
                  label="دسته"
                  resultType="string"
                  className="col-md-6 col-lg-8"
                  control="searchableselect"
                  options={
                    typeof mainCategories == "object" ? mainCategories : []
                  }
                  name="category_ids"
                  firstItem="دسته مورد نظر را انتخاب کنید..."
                  initialItems={selectedCategory}
                />

                <FormikControl
                  label="عنوان"
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="text"
                  name="title"
                  placeholder="عنوان محصول"
                />
                <FormikControl
                  label="قیمت"
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="number"
                  name="price"
                  placeholder="قیمت محصول"
                />

                <FormikControl
                  label="وزن"
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="number"
                  name="weight"
                  placeholder="وزن محصول (کیلوگرم)"
                />
                <FormikControl
                  label="برند"
                  resultType="string"
                  className="col-md-6 col-lg-8"
                  control="select"
                  options={brands}
                  name="brand_id"
                  firstItem="برند مورد نظر را انتخاب کنید..."
                  additionalField={<AddBrands />}
                  setForceRender={setForceRender}
                />
                
                <FormikControl
                  label="رنگ"
                  resultType="string"
                  className="col-md-6 col-lg-8"
                  control="searchableselect"
                  options={typeof colors == "object" ? colors : []}
                  name="color_ids"
                  firstItem="رنگ مورد نظر را انتخاب کنید..."
                  initialItems={selectedColor}
                />
                <FormikControl
                  label="رنگ"
                  resultType="string"
                  className="col-md-6 col-lg-8"
                  control="filterselect"
                  options={typeof colors == "object" ? colors : []}
                  name="color_ids"
                  firstItem="رنگ مورد نظر را انتخاب کنید..."
                  initialItems={selectedColor}
                />

                <FormikControl
                 label="گارانتی"
                  resultType="string"
                  className="col-md-6 col-lg-8"
                  control="searchableselect"
                  options={guarantee}
                  name="guarantee_ids"
                  firstItem="گارانتی مورد نظر را انتخاب کنید..."
                  initialItems={selectedGuarantees}
                />
                <FormikControl
                  label="توضیحات"
                  className="col-md-6 col-lg-8"
                  control="ckeditor"
                  name="descriptions"
                  placeholder="توضیحات"
                />
                <FormikControl
                  label="توضیحات کوتاه"
                  className="col-md-6 col-lg-8"
                  control="textarea"
                  name="short_descriptions"
                  placeholder="فقط از حروف واعداد استفاده شود"
                />

                <FormikControl
                  label="توضیحات  سبد"
                  className="col-md-6 col-lg-8"
                  control="textarea"
                  name="cart_descriptions"
                  placeholder="فقط از حروف واعداد استفاده شود"
                />
                {productEdit?<FormikControl
                  label="تصویر"
                  className="col-md-6 col-lg-8"
                  control="file"
                  name="image"
                  placeholder="تصویر"
                />:null}
                <FormikControl
                  label="توضیح تصویر"
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="text"
                  name="alt_image"
                  placeholder="یک کلمه در مورد تصویر"
                />
                {/* <FormikControl
                  label="تگ ها"
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="text"
                  name="keywords"
                  placeholder="با - از هم جدا شوند"
                /> */}
                <FormikControl
                  label="تگ ها"
                  className="col-md-6 col-lg-8"
                  control="inputenter"
                  type="text"
                  name="keywords"
                  placeholder="با فاصله از هم جدا شوند"
                  resultType="string"
                  initialItems={selecteKeyW}
                  form={formik}
                />
                <FormikControl
                  label="موجودی"
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="number"
                  name="stock"
                  placeholder="فقط عدد"
                />
                <FormikControl
                  label="درصد تخفیف"
                  className="col-md-6 col-lg-8"
                  control="input"
                  type="number"
                  name="discount"
                  placeholder="فقط عدد"
                /> 

                <div className="col-12 col-md-6 col-lg-8 row justify-content-center">
                  <div className="col-12 col-md-4 col-lg-3 mx-lg-5">
                    <FormikControl
                      label="وضعیت فعال"
                      className="form-check form-switch col-5 col-md-2"
                      control="switch"
                      name="is_active"
                    />
                  </div>
                </div>
                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                  <SubmittingButton tittle="ذخیره" />
                  <PrevPageButton />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
