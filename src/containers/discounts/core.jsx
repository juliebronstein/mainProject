import * as Yup from "yup";
import { addNewDicount, editDicount } from "../../services/discoints";
import { ConvertDateToMiladi } from "../../layouts/admin/utils/ConvertDate";
import { Alert } from "../../layouts/admin/utils/alert";

export const initialValues = {
  title: "",
  code: "",
  percent: "",
  expire_at: "",
  for_all: true,
  product_ids: "",
};

export const onSubmit = async (
  values,
  actions,
  discountSelected,
  setData
) => {
  values = {
    ...values,
    for_all: values.for_all ? 1 : 0,
    expire_at: ConvertDateToMiladi(values.expire_at),
  };
  try {
    if (discountSelected) {
      const res=await editDicount(discountSelected.id,values)
      if((res.status==200)){
      Alert("انجام شد", res.data.message, "success")
      setData(old=>{
        let newData=[...old]
        let index=newData.findIndex(i=>i.id==discountSelected.id)
        newData[index]=res.data.data
        return newData
      })
    }
     
    } else {
      const res = await addNewDicount(values);
      if (res.status == 201) {
        Alert("انجام شد", res.data.message, "success");
        setData((old) => [...old, res.data.data]);
      
        actions.resetForm();
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  expire_at: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(/^[0-9/\ \s-]+$/, "فقط ازاعداد و خط تیره استفاده شود"),
  code: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(/^[a-zA-Z0-9\s@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  percent: Yup.number().required("لطفا این قسمت را پر کنید"),
  for_all: Yup.boolean(),
  product_ids: Yup.string().when("for_all", {
    is: false,
    then: Yup.string()
      .required("لطفا این قسمت را پر کنید")
      .matches(/^[0-9\s-]+$/, "فقط ازاعداد و خط تیره استفاده شود"),
  }),
});
