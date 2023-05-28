
import * as Yup from "yup";
import { ceateBrandsService, editBrandsService } from "../../services/brands";
import { Alert } from "../../layouts/admin/utils/alert";
export const initialValues = {
    id: "",
    original_name: "",
    persian_name: "",
    logo: null,
    descriptions: "",
  };
  export const validationSchema = Yup.object({
    original_name: Yup.string()
      .required("لطفا این قسمت را پر کنید")
      .matches(
        /^[a-zA-Z0-9\s@!%$?&]+$/,
        "فقط از اعداد و حروف لاتین استفاده شود"
      ),
    persian_name: Yup.string()
      .required("لطفا این قسمت را پر کنید")
      .matches(/^[\u0600-\u06FF]+$/, "فقط از اعداد و حروف فارسی استفاده شود"),
    descriptions: Yup.string().matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از اعداد و حروف استفاده شود"
    ),
    logo: Yup.mixed()
      .test("filesize", "حجم فایل نمیتواند بیشتر 500 کیلوبایت باشد", (value) =>
        !value ? true : value.size <= 500 * 1024
      )
      .test("format", "فرمت فایل باید jpg باشد", (value) =>
        !value
          ? true
          : value.type === "image/jpeg" || value.type === "image/png"
      ),
  });
  export const onSubmit = async (values, actions, editeBrand, setEditeBrand,setData,setForceRender) => {
    try {
      if (editeBrand) {
        const res = await editBrandsService(editeBrand.id, values);
        if ((res.status = 201))
        Alert('انجام شد', res.data.message, 'success');
        setData((old) => {
          const newData = [...old];
          const index = newData.filter((i) => (i.id = res.data.data.id));
          old[index] = res.data.data;
          return old;
        });
        setForceRender((last) => last + 1);
      } else {
        
        const res = await ceateBrandsService(values);
        if (res.status === 201) {
         
            Alert('انجام شد', res.data.message, 'success');
             actions.resetForm()
            setData(lastData=>[...lastData, res.data.data])
        }else{
          console.log("res",res.data)
        }
      }
    } catch (err) {
      console.log("err",err.message)
    }
  };