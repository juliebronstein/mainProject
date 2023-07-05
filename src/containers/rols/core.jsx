import * as Yup from "yup";
import { addNewRole, editRolePermissionsService,editRoleService } from "../../services/user";
import { Alert } from "../../layouts/admin/utils/alert";


export const initialValues={
    title:"",
    describtion:"",
    permissions_id:[],
}
export const onSubmit=async(values,actions,setData,selectedRoleId,editType)=>{

  if (editType === "role") {
    const res = await editRoleService(selectedRoleId, values)
    if (res.status === 200) {
        Alert('انجام شد', res.data.message, 'success')
        setData(lastData=>{
            let newData = [...lastData];
            let index = newData.findIndex((d) => d.id == selectedRoleId);
            newData[index] = res.data.data;
            return newData;
        })
    }
}else if (editType === "permissions") {
    const res = await editRolePermissionsService(selectedRoleId, values)
    if (res.status === 200)  Alert('انجام شد', res.data.message, 'success')

  }else{
  const res=await addNewRole(values)
  if(res.status===201){
  Alert("انجام شد",res.data.message,"success")
  setData(old=>[...old,res.data.data])
  actions.resetForm();
}}
}
// export const validationSchema= Yup.object({
//   permissions_id: Yup.array().min(1, "حداقل یک مورد انتخاب کنید"),
//         title: Yup.string()
//           .required("لطفا این قسمت را پر کنید")
//           .matches(
//             /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
//             "فقط از حروف و اعداد استفاده شود"
//           ),
//           description: Yup.string()
//           .required("لطفا این قسمت را پر کنید")
//           .matches(
//             /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
//             "فقط از حروف و اعداد استفاده شود"
//           ),
// })


export const validationSchema = Yup.object().shape({
  title: Yup.string().when('editPermissions', {
      is: true,
      then: null,
      otherwise: Yup.string().required("لطفا این قسمت را پر کنید")
      .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  }),        
  description: Yup.string().when('editPermissions', {
      is: true,
      then: null,
      otherwise: Yup.string().required("لطفا این قسمت را پر کنید")
      .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  }),
  permissions_id: Yup.array().min(1, "حد اقل یک مورد انتخاب کنید")
})