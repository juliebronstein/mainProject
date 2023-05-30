import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCategoryAttributes } from "../../../services/attributes";
import { Form, Formik } from "formik";
import { PrevPageButton } from "../../../components/PrevPageButton";
import FormikControl from "../../../components/form/FormikControl";
import { SubmittingButton } from "../../../components/SubmittingButton";
import SpinnerLoad from "../../../components/SpinnerLoad";
import * as Yup from "yup";
import { addProductAttrService, getProductAttrService } from "../../../services/product";
import { Alert } from "../../../layouts/admin/utils/alert";
const SetAttribute = () => {
  const location = useLocation();
  const { selectedProduct } = location.state;
  // console.log("selectedProduct",selectedProduct);
  const [attrs, setAttrs] = useState();
  const [initialValues,setInitialValues]=useState(null)
  const [validationSchema,setValidationSchema]=useState({})
  const onSubmit=async(values, actions,id)=>{
    
    let data={}
    for(const key in values)
     if(values[key]) data={...data, [key] :{value:values[key]}}

  try{
    // const rest=await getProductAttrService(id)
    
    const rest=await addProductAttrService(id,data)
    if(rest.status==200)
    Alert("انجام شد",rest.data.message,"success")
    // console.log(rest.data)
  }catch(err){}
}
    
  const handleGetAttributes = async ()=>{
    let attrval=[]
    let initial={}
    let validate={}

    Promise.all(
      
             selectedProduct.categories.map(async (cat)=>{
              try{
            const res = await getCategoryAttributes(cat.id)
            if (res.status === 200) 
            attrval=[...attrval,{groupTitle:cat.title,data:res.data.data}]
            if(res.data.data?.length>0)
               for(const d of res.data.data){
                initial={...initial,[d.id]:""}
                validate={...validate,[d.id]:Yup.string().matches(/^[\u0600-\u06FF\sa-azA-Z0-9@!%-.$?&]/,"فقط از حروف و اعداد استفاده شود")}
               }
            }catch(err){console.log("err",err)}
        } )
    ).then(()=>{
    setInitialValues(Object.keys(initial).length>0?initial:{})     
    setValidationSchema(Object.keys(validate).length>0?Yup.object(validate):{})     
    console.log("initialValues",initialValues)
      setAttrs(attrval )
    })
 
   
}
  useEffect(() => {
    handleGetAttributes();
  }, []);
  return ( 
    <>  {/* <div className="text-center"> */}
              <div className="row justify-content-center ">
                <div className="text-left col-md-6 col-lg-8 m-auto my-3 text-left">
                  <PrevPageButton />
                </div>
                {initialValues?( <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => onSubmit(values, actions,selectedProduct.id)}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form>
         
                <h4 className="text-center my-3"> نام محصول: <span className="text-primary"> {selectedProduct.title}</span> </h4>
                
                   {attrs.map((attr, index) => (
                    <div
                      key={attr.id + "-attr" + index}
                      className="col-12 col-md-6 col-lg-8 text-center row justify-content-center "
                    >
                      <span className="text-center">{attr.groupTitle} </span>
                      {
                        attr.data.length>0?(
                          attr.data?.map((i, index) => (
                            <div key={index + "i-" + i.id}>
                              <FormikControl
                                label={i.title}
                                className="col-md-6 col-lg-8 "
                                control="input"
                                type="text"
                                name={i.id}
                                placeholder=""
                                additionalField={i.unit}
                              />
                            </div>
                          ))
                        ):<span className="text-center text-danger"> هیچ ویژگی برای این دسته بندی ثبت نشده است </span>
                      }
                    </div>
                  ))
                
             }
              

                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                  <SubmittingButton tittle="ذخیره" />
                </div>
            
          </Form>
        );
      }}
    </Formik>):<SpinnerLoad colorClass="text-primary" />}
   
     </div>
            {/* </div> */}
            </>
  );
};

export default SetAttribute;
