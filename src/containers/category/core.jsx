import * as Yup from "yup";
import { Alert } from "../../layouts/admin/utils/alert";
import {
  addNewCategoryService,
  editeCategoryService,
} from "../../services/category";

export const initialValues = {
  parent_id: "",
  title: "",
  descriptions: "",
  image: null,
  is_active: true,
  show_in_menu: true,
};
//export const reinitialValues={
//   parent_id: "",
//   title: "",
//   description: "",
//   image: null,
//   is_active: true,
//   show_in_menu: true,
// }
export const validationSchema = Yup.object({
  parent_id: Yup.number(),
  title: Yup.string()
    .required("لطفا این قسمت را پر نمایید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  descriptions: Yup.string().matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از حروف و اعداد استفاده شود"
  ),
  image: Yup.mixed()
    .test("filesize", "حجم فایل نمیتواند بیشتر 500 کیلوبایت باشد", (value) =>
      !value ? true : value.size <= 500 * 1024
    )
    .test("format", "فرمت فایل باید jpg باشد", (value) =>
      !value ? true : value.type === "image/jpeg"
    ),
  is_active: Yup.boolean(),
  show_in_menu: Yup.boolean(),
});

export const onSubmit = async (
  values,
  actions,
  setForceRender,
  editeId,
  setEditeCategory,
  setParents,setForceRenderP
) => {

  try {
    values = {
      ...values,
      is_active: values.is_active ? 1 : 0,
      show_in_menu: values.show_in_menu ? 1 : 0,
    };
    if (editeId) {
      const res = await editeCategoryService(editeId, values);
      if ((res.status = 201)) {
        Alert("ویرایش رکورد", res.data.message, "success");

        setEditeCategory({
          ...values,
          is_active: values.is_active ? true : false,
          show_in_menu: values.show_in_menu ? true : false,
        });
      }

      setForceRender((last) => last + 1);
    } else {
      const res = await addNewCategoryService(values);

      if ((res.status === 201)) Alert("ثبت رکورد", res.data.message, "success");
      //if(!values.parent_id) setParents((parents)=> [...parents,values]) 
      setForceRender((last) => last + 1);
      setForceRenderP((last) => last + 1);
    }

    actions.resetForm();
  } catch (error) {
    console.log(error);
  }
};
