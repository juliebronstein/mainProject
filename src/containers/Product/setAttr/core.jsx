import { addProductAttrService } from "../../../services/product";
import { Alert } from "../../../layouts/admin/utils/alert"
import { getCategoryAttributes } from "../../../services/attributes";
import * as Yup from "yup";
export const onSubmit=async(values, actions,id)=>{
    let data={}
    for(const key in values)
     if(values[key]) data={...data, [key] :{value:values[key]}}

  try{
       
    const rest=await addProductAttrService(id,data)
    if(rest.status==200)
    Alert("انجام شد",rest.data.message,"success")
     }catch(err){}
}
export const initData=async(selectedProduct)=>{
  let attrval=[]
  let initial={}
  let validate={}
  const promise=Promise.all(
    selectedProduct.categories.map(async (cat)=>{
     try{
   const res = await getCategoryAttributes(cat.id)
   if (res.status === 200) 
   attrval=[...attrval,{groupTitle:cat.title,data:res.data.data}]
   if(res.data.data?.length>0)
      for(const d of res.data.data){
       const value=selectedProduct.attributes.filter(i=>i.id==d.id)[0]?.pivot.value||""
       initial={...initial,[d.id]:value}
       validate={...validate,[d.id]:Yup.string().matches(/^[\u0600-\u06FF\sa-azA-Z0-9@!%-.$?&]/,"فقط از حروف و اعداد استفاده شود")}
      }
   }catch(err){console.log("err",err)}
} )
)
const promiserest=await promise
return{
  attrval,
initial,
validate
}
}