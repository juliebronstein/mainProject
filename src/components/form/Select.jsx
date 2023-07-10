import { ErrorMessage, Field } from "formik";
import React from "react";
import FormikError from "./FromikError";

const Select = ({options, name, label, className, firstItem, handleOnchange,additionalField,setForceRender,...others
}) => {
    const setOptions = ()=>{
        return (
            <>
                <option value=""> {firstItem} </option>
                
                {options.map((o) => (
                  
                    <option key={o.id} value={o.id}> {o.value} </option>
                ))}
            </>
        )
    }
  return (
        <div className={`col-12 ${className}`}>
            <div className="input-group mb-3 dir_ltr">
                  {additionalField?  
                  <span className="input-group-text vertical justify-content-center" 
                  onClick={()=>setForceRender?setForceRender((last)=>last+1):()=>{}}><>            
                      {additionalField}
                 </></span>:null}
                <Field>
                    {({form})=>{
                        return (
                            <>
                                {
                                    handleOnchange ? (
                                        <Field as="select" className="form-control" id={name} name={name} 
                                        onChange={(e)=>handleOnchange(e.target.value, form)} {...others}
                                        >
                                            {setOptions()}
                                        </Field>
                                    ) : (
                                        <Field as="select" className="form-control" id={name} name={name}>
                                            {setOptions()}
                                        </Field>                                        
                                    )
                                }
                            </>
                        )
                    }}
                </Field>
                {label && <span className="input-group-text w_6rem justify-content-center">{label}</span>}
            </div>
            <ErrorMessage name={name} component={FormikError}/>
        </div>
  );
};

export default Select;