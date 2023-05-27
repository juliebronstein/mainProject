import * as Yup from "yup";
import {
  addNewGuarantyService,
  editGuarantyService,
} from "../../services/guaranties";
import { Alert } from "../../layouts/admin/utils/alert";


  export const initialValues = {
    title: "",
    descriptions: "",
    length: 0,
    length_unit: "",
  };
  export const onSubmit = async (
      values,
    actions,
    setData,
    editeItem,
    setEditeItem
  ) => {
    try {
      if (editeItem) {
        const res = await editGuarantyService(editeItem.id,values);
        if ((res.status = 200)) {
            Alert("ویرایش رکورد", res.data.message, "success");
          setData((old) => {
            const newData = [...old];
            const index = newData.filter((i) => i.id === editeItem.id);
            newData[index] = res.data.data;
            return newData;
          });
          
          setEditeItem(()=>values);
        }
      } else {
        const res = await addNewGuarantyService(values);
        if (res.status === 201) {
            Alert("انجام شد", res.data.message, "success");
            setData((lastData) => [...lastData, res.data.data]);
          actions.resetForm();
        }
      }
    } catch (err) {}
  };

  
// export const onSubmit = async (values, actions, setData, guaranteeToEdit) => {
//     if (guaranteeToEdit) {
//       const res = await editGuaranteeService(guaranteeToEdit.id, values);
//       if (res.status === 200) {
//         Alert("انجام شد", res.data.message, "success");
//         setData((lastData) => {
//           let newData = [...lastData];
//           let index = newData.findIndex((d) => d.id == guaranteeToEdit.id);
//           newData[index] = res.data.data;
//           return newData;
//         });
//       }
//     } else {
//       const res = await addNewGuaranteeService(values);
//       if (res.status === 201) {
//         Alert("انجام شد", res.data.message, "success");
//         setData((lastData) => [...lastData, res.data.data]);
//       }
//     }
//   };
  
  export const validationSchema = Yup.object({
    title: Yup.string()
      .required("لطفا این قسمت را پر کنید")
      .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/, "فقط از اعداد و حروف لاتین استفاده شود"),
    length: Yup.number(),
    descriptions: Yup.string().matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از اعداد و حروف استفاده شود"
    ),
    length_unit: Yup.string()
    .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/, "فقط از اعداد و حروف لاتین استفاده شود"),
  });