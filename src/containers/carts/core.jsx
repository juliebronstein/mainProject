
import * as Yup from "yup";

export const initialValues = {
    user_id: "",
    product_id: "",
    color_id: "",
    guarantee_id: "",
    count: "",
};
export const onSubmit=async(actions, values, setData, setSelectedProducts, setSelectedProductsInfo, curentProduct)=>{
    console.log("values",values)
   setSelectedProducts(old=>[...old,{...values}])
   console.log("curentProduct.guarantees[values.guarantee_id]",curentProduct.guarantees.find(g=>g.id==values.guarantee_id).title   )
   setSelectedProductsInfo(old=>[...old,{
    title:curentProduct.title,
    price:curentProduct.price,
    guarante:curentProduct.guarantees.find(g=>g.id==values.guarantee_id).title,
    count:values.count
   }])
   console.log("curentProductc",curentProduct)
//    console.log(sele)
   actions.resetForm();
   
}
export const validationSchema = Yup.object().shape({
    user_id : Yup.number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پر کنید"),
    product_id : Yup.number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پر کنید"),
    color_id : Yup.number().typeError("فقط عدد وارد کنید"),
    guarantee_id : Yup.number().typeError("فقط عدد وارد کنید"),
    count : Yup.number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پر کنید"),
})