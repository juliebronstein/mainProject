import { ErrorMessage, FastField } from 'formik';
import React from 'react';
import FormikError from './FromikError';

const Input = ({type, name, label, className, placeholder,additionalField,...others}) => {
    return (
        <div id={name} className={`col-12 ${className}`}>
            <div className="input-group mb-3 dir_ltr">
                {additionalField?<span className="input-group-text w_6rem justify-content-center"> {additionalField} </span>:null}
                <FastField type={type} name={name} className="form-control" placeholder={placeholder} {...others} />
                {label&&<span className="input-group-text w_6rem justify-content-center"> {label} </span>}
            </div>
            <ErrorMessage name={name} component={FormikError}/>
        </div>
    );
}

export default Input;