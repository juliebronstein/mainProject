import { ErrorMessage, Field } from 'formik';
import React from 'react';
import FormikError from './FromikError';


const Radio = (props) => {
    const {name,label,options, className,formik} = props;
    const handleOptionChange=(e)=>{
        formik.setValues({
            ...formik.values,
            [name]: parseInt(e.target.value) 
        })
    }
    return (
        <div className={`mb-2 ${className} row`}>
            <label htmlFor={name} className="form-label">{label}</label>
            <ErrorMessage name={name}component={FormikError} />
            <Field className="form-control" id={name} name={name}>
                {({field})=>{
                    return options.map(o=>(
                        <div className="d-inline-block col-md-6 col-xl-4 pb-1 fleximport" key={o.id}>
                            <input 
                             className='form-check-input mx-2'
                            type="radio" 
                            id={`${name}_${o.id}`}
                            {...field}
                            value={o.id}
                            onChange={handleOptionChange} 
                            checked={field.value == o.id}
                            />
                            <label htmlFor={`${name}_${o.id}`} className="d-inline-block  pointer">{o.value}</label>
                        </div>
                    ))
                }}
            </Field>
        </div>
    );
}

export default Radio;