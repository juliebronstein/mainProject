import * as Yup from "yup";
export const onSubmit=async(actions,values)=>{

}
export const initialValues={
    title:"",
    describtion:"",
    permissions_id:"",
}
export const validationSchema= Yup.object({
       permissions_id: Yup.string().required("لطفا این قسمت را پر کنید"),
        title: Yup.string()
          .required("لطفا این قسمت را پر کنید")
          .matches(
            /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
            "فقط از حروف و اعداد استفاده شود"
          ),
          describtion: Yup.string()
          .required("لطفا این قسمت را پر کنید")
          .matches(
            /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
            "فقط از حروف و اعداد استفاده شود"
          ),
})