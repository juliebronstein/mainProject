import * as Yup from "yup";
import {
  addAttributeService,
  editeAttributeService,
} from "../../../services/attributes";
import { Alert } from "../../../layouts/admin/utils/alert";
export const onSubmit = async (
  values,
  actions,
  categoryId,
  setData,
  editeAttr,
  setEditeAttr,

) => {
  values = {
    ...values,
    in_filter: values.in_filter ? 1 : 0,
  };
  try {
    if (editeAttr) {
      const res = await editeAttributeService(editeAttr.id, values);

      if ((res.status = 200)) {
        setData((oldData) => {
          const newData = [...oldData];
          const index = newData.filter((d) => d.id === editeAttr.id);
          newData[index] = res.data.data;
          return newData;
        });
        Alert("ثبت ویژگی", res.data.message, "success");
        setEditeAttr(null);
        actions.resetForm();
      }
    } else {
      const res = await addAttributeService(categoryId, values);
      if ((res.status = 201)) {
        Alert("ثبت ویژگی", res.data.message, "success");

        setData((data) => [...data, res.data.data]);
      }
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    setEditeAttr(null);
    actions.resetForm();
  }
};

export const initialValues = {
  title: "",
  unit: "",
  in_filter: false,
};

export const validationSchema = Yup.object({
  title: Yup.string()
    .required("لطفا این قسمت را پر نمایید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  unit: Yup.string()
    .required("لطفا این قسمت را پر نمایید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  in_filter: Yup.boolean(),
});
