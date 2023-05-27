import { Alert } from "../../layouts/admin/utils/alert";
import { ceateColorService, editColorService } from "../../services/color";
import * as Yup from "yup";
 export const initialValues = {
    title: "",
    code: "",
};
export const validationSchema = Yup.object({
  title: Yup.string()
    .required("لطفا این قسمت را پر نمایید")
    .matches(/^[\u0600-\u06FF\sa-zA-Z@!%$?&]+$/, "فقط از حروف استفاده شود"),
  code: Yup.string().required("لطفا این قسمت را پر نمایید"),
});
 export const onSubmit = async (
    values,
    actions,
    setData,
    setEditeColor,
    editeColor
  ) => {
    if (editeColor) {
      const res = await editColorService(editeColor.id, values);
      if ((res.status = 200)) {
        // Alert( "ویرایش",`رنگ ${editeColor.title} وبرایش شد`,"success")
        Alert("انجام شد", res.data.message, "success");
        setData((oldData) => {
          const newData = [...oldData];
          const index = newData.filter((d) => d.id === editeColor.id);
          newData[index] = res.data.data;

          return newData;
        });
        setEditeColor({
          title: values.title,
          code: values.code,
        });
      }
    } else {
      const res = await ceateColorService(values);
      if ((res.status = 200)) {
        // Alert( "افزودن",`رنگ ${values.title} اضافه شد`,"success")
        Alert("انجام شد", res.data.message, "success");
        setData((oldData) => {
          return [...oldData, values];
        });
        actions.resetForm();
      }
    }
  };