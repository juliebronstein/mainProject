import { ErrorMessage, Field } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import FormikError from "./FromikError";

const InputEnter = ({
  type,
  name,
  label,
  className,
  placeholder,
  resultType,
  initialItems,
  form
}) => {
  const [tags, setTags] = useState(initialItems?initialItems:[]);
  // const [flag, setFlag] = useState(false);
  const [targetvalue, setTargervalue] = useState("");

  useEffect(() => {
    const newValue = resultType == "string" ? tags.join("-") : tags;
    form.setFieldValue(name, newValue);
  }, [tags]);

  useEffect(() => {
  setTags(initialItems)
  }, [initialItems])
  
  const handelChange = (event, formik) => {
    setTargervalue(event.target.value);
    if (event.nativeEvent.data == " ") {
      if (tags.findIndex((i) => i === targetvalue) == -1)
        setTags([...tags, targetvalue]);
        
      
      setTargervalue("");
    }
  };
  const handleRemovefromSelectedItems = (selectedItem, formik) => {
    setTags((oldData) => {
      const newData = oldData.filter((d) => d != selectedItem);
           return newData;
    });
  };
  return (
    <Field>
      {({ form }) => {
        return (
          <div className={`col-12 ${className}`}>
            <div className="input-group mb-3 dir_ltr">
              <Field
                type={type}
                name={name + "-select"}
                className="form-control"
                placeholder={placeholder}
                value={targetvalue}
                onChange={(e) => handelChange(e, form)}
              />
              <span className="input-group-text w_6rem justify-content-center">
                {" "}
                {label}{" "}
              </span>
            </div>
            {/* className="dir_ltr" for englidh tags */}
            <div className="margin-b " id={name + "-select"}> 
              {tags.length > 0
                ? tags.map((selectedItem, index) => (
                    <span className="chips_elem" key={index}>
                      <i
                        className="fas fa-times text-danger"
                        onClick={(e) =>
                          handleRemovefromSelectedItems(selectedItem, form)
                        }
                      ></i>
                      {selectedItem}
                    </span>
                  ))
                : null}
            </div>
            <ErrorMessage name={name} component={FormikError} />
          </div>
        );
      }}
    </Field>
  );
};

export default InputEnter;
