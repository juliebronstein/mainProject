import * as Yup from "yup";
import {
  createnewProductService,
  editProductService,
} from "../../services/product";
import { Alert } from "../../layouts/admin/utils/alert";

export const initialValues = {
  category_ids: "",
  title: "",
  price: "",
  weight: "",
  brand_id: "",
  color_ids: "",
  guarantee_ids: "",
  descriptions: "",
  short_descriptions: "",
  cart_descriptions: "",
  image: "",
  alt_image: "",
  keywords: "",
  stock: "",
  discount: "",
  is_active: 0,
};

export const onSubmit = async (values, actions, productEdit) => {
  // e.preventDefault();
  // console.log(values)
  try {
    values = { ...values, is_active: values.is_active ? 1 : 0 };
    if (productEdit) {
      const res = await editProductService(productEdit.id, values);
      if (res.status === 200) 
        Alert("افزودن", res.data.message, "success");      
    } else {
      const res = await createnewProductService(values);
      console.log(res);
      if (res.status === 201) {
        Alert("افزودن", res.data.message, "success");
        actions.resetForm();
      }
    }
  } catch (err) {
    Alert("خطا",err.message, "warning");
  }
};

export const validationSchema = Yup.object({
  category_ids: Yup.string().required("لطفا این قسمت را پر کنید"),
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  price: Yup.number().required("لطفا این قسمت را پر کنید"),
  weight: Yup.number(),
  brand_id: Yup.number(),
  color_ids: Yup.string().matches(
    /^[0-9\s-]+$/,
    "فقط ازاعداد و خط تیره استفاده شود"
  ),
  guarantee_ids: Yup.string().matches(
    /^[0-9\s-]+$/,
    "فقط ازاعداد و خط تیره استفاده شود"
  ),
  // descriptions: Yup.string().matches(
  //   /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
  //   "فقط از حروف و اعداد استفاده شود"
  // ),
  short_descriptions: Yup.string().matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
    "فقط از حروف و اعداد استفاده شود"
  ),
  cart_descriptions: Yup.string().matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
    "فقط از حروف و اعداد استفاده شود"
  ),
  image: Yup.mixed()
    .test("filesize", "حجم فایل نمیتواند بیشتر 500 کیلوبایت باشد", (value) =>
      !value ? true : value.size <= 500 * 1024
    )
    .test("format", "فرمت فایل باید jpg باشد", (value) =>
      !value ? true : value.type === "image/jpeg"
    ),
  alt_image: Yup.string().matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
    "فقط از حروف و اعداد استفاده شود"
  ),
  keywords: Yup.string().matches(
    /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
    "فقط از حروف و اعداد استفاده شود"
  ),
  stock: Yup.number(),
  discount: Yup.number(),
});
