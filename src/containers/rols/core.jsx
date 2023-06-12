import * as Yup from "yup";
import { addNewRole, editRole } from "../../services/user";
import { Alert } from "../../layouts/admin/utils/alert";


export const initialValues={
    title:"",
    describtion:"",
    permissions_id:[],
}
export const onSubmit=async(values,actions,setData,selectedRoleId)=>{
 console.log(values)
  if(selectedRoleId){
    const res=await editRole(selectedRoleId,values)
    if(res.status===200){
  Alert("انجام شد",res.data.message,"success")
setData((old)=>{
  const newdata=[...old]
  const index=newdata.findIndex(i=>i.id===selectedRoleId)
  newdata[index]=res.data.data
  return newdata
})
    }
  }else{
  const res=await addNewRole(values)
  if(res.status===201){
  Alert("انجام شد",res.data.message,"success")
  setData(old=>[...old,res.data.data])
  actions.reserForm()
}}
}
export const validationSchema= Yup.object({
  permissions_id: Yup.array().min(1, "حد اقل یک مورد انتخاب کنید"),
        title: Yup.string()
          .required("لطفا این قسمت را پر کنید")
          .matches(
            /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
            "فقط از حروف و اعداد استفاده شود"
          ),
          description: Yup.string()
          .required("لطفا این قسمت را پر کنید")
          .matches(
            /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
            "فقط از حروف و اعداد استفاده شود"
          ),
})


// export const validationSchema = Yup.object().shape({
//   title: Yup.string().when('editPermissions', {
//       is: true,
//       then: null,
//       otherwise: Yup.string().required("لطفا این قسمت را پر کنید")
//       .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
//   }),        
//   description: Yup.string().when('editPermissions', {
//       is: true,
//       then: null,
//       otherwise: Yup.string().required("لطفا این قسمت را پر کنید")
//       .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
//   }),
//   permissions_id: Yup.array().min(1, "حد اقل یک مورد انتخاب کنید")
// })