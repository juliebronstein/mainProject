import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Field } from 'formik';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic/build/ckeditor';
import { ErrorMessage } from "formik";
import FormikError from './FromikError';


const Ckeditor = ({name, label, className, placeholder}) => {
    return (
        <Field>
            {({form})=>{
                return (
                    <div className={`col-12 ${className} mb-3`}>
                        <CKEditor
                        editor={ ClassicEditor }
                        data={form.values[name] || `<p>${label} : ${placeholder}</p>`}
                        // onReady={ editor => {console.log('ready'); } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            form.setFieldValue(name, data)
                            // console.log("name",name)
                            // console.log("data",data)
                        }}
                        onBlur={(event, editor) => {
                            form.setFieldTouched(name)
                        }}
                        onFocus={(event, editor) => 
                            editor.getData() == `<p>${label} : ${placeholder}</p>` ? editor.setData('') : null
                        }
                        />
                        <div className='mt-2'>
                            <ErrorMessage name={name} component={FormikError}/>
                        </div>
                    </div>
                )
            }}
        </Field>
    );
}

export default Ckeditor;