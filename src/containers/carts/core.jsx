
import * as Yup from "yup";

export const initialValues = {
    user_id: "",
    product_id: "",
    color_id: "",
    guarantee_id: "",
    count: "",
};
export const onSubmit=async()=>{}
export const validationSchema = Yup.object().shape({
    user_id : Yup.number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پر کنید"),
    product_id : Yup.number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پر کنید"),
    color_id : Yup.number().typeError("فقط عدد وارد کنید"),
    guarantee_id : Yup.number().typeError("فقط عدد وارد کنید"),
    count : Yup.number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پر کنید"),
})