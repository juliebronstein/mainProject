import { ErrorMessage, FastField } from 'formik';
import React from 'react';
import FormikError from './FromikError';

const InputEnter = ({type, name, label, className, placeholder,handelEnter}) => {
    return (
        <div className={`col-12 ${className}`}>
            <div className="input-group mb-3 dir_ltr">
                <FastField type={type} name={name} 
                className="form-control" 
                placeholder={placeholder} 
                onKeyDown={(e)=>handelEnter(e)} />
                <span className="input-group-text w_6rem justify-content-center"> {label} </span>
            </div>
            <ErrorMessage name={name} component={FormikError}/>
        </div>
    );
}

export default InputEnter;