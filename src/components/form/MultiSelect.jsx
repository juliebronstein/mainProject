// import { ErrorMessage, Field } from "formik";
// import React from "react";
// import { useState } from "react";
// import FormikError from "./FromikError";

// // if resultType == "string" then:  "1-2-3"  else:   [1,2,3]

// const MultiSelect = ({resultType, options, name, label, className, firstItem}) => {
//   const [selectedItems, setSelectedItems] = useState([]);
// console.log("setSelectedItems:",selectedItems)
//   const handleSelectItems = (selectedId, formik)=>{
//     setSelectedItems(oldData=>{
//         if (oldData.findIndex(d=>d.id == selectedId) == -1 && selectedId > 0) {
//             const newData = [...oldData, options.filter(o=>o.id == selectedId)[0]];

//             const selectedIds = newData.map(nd=>nd.id);
//             const nameValue = resultType == "string" ? selectedIds.join("-") : selectedIds
//             formik.setFieldValue(name, nameValue);

//             return newData
//         }else{
//             return oldData
//         }
//     })
//   }

//   const handleRemovefromSelectedItems = (selectedId, formik) => {
//     setSelectedItems((oldData) => {
//       const newData = oldData.filter((d) => d.id != selectedId);

//       const selectedIds = newData.map((nd) => nd.id);
//       const nameValue = resultType == "string" ? selectedIds.join("-") : selectedIds
//       formik.setFieldValue(name, nameValue);

//       return newData;
//     });
//   };

//   return (
//     <Field>
//       {({ form }) => {
//         return (
//           <div className={`col-12 ${className}`}>

//             <div className="input-group mb-3 dir_ltr">
//               <select className="form-control" id={name + "-select"} onChange={(e)=>handleSelectItems(e.target.value, form)} >
//                 <option value=""> {firstItem} </option>
//                 {options.map((o) => (
//                   <option key={o.id} value={o.id}> {o.value} </option>
//                 ))}
//               </select>
//               <label htmlFor={name + "-select"} className="input-group-text w_6rem justify-content-center" >{label}</label>
//             </div>

//             <ErrorMessage name={name} component={FormikError} />

//             <div className="col-12 col-md-6 col-lg-8">
//               {selectedItems.map((selectedItem) => (
//                 <span className="chips_elem" key={selectedItem.id}>
//                   <i className="fas fa-times text-danger" onClick={() => handleRemovefromSelectedItems(selectedItem.id, form)}></i>
//                   {selectedItem.value}
//                 </span>
//               ))}
//             </div>

//           </div>
//         );
//       }}
//     </Field>
//   );
// };

// export default MultiSelect;

import { ErrorMessage, FastField } from "formik";
import React from "react";
import FormikError from "./FromikError";
import SpinnerLoad from "../SpinnerLoad";
import FormikControl from "./FormikControl";

//if resulttype=== string then:"1-2-3" else [1,2,3]

const MultiSelect = ({
  resultType,
  options, //mainCategories
  name, //"category_ids"
  className,
  firstitem, //"دسته مورد نظر را انتخاب کنید..."
  label,
  setSelected, //setSelectedCategories
  selectetd, //selectedCategories
  // formik,//form
}) => {
  // const [selectetd, setSelected] = useState([])
  const handelSelectoption = (value, formik) => {
    const item = options.filter((i) => i.id == value)[0];
    if (item) {
      setSelected((old) => {
        if (old.findIndex((i) => i.id == value) == -1) {
          const newData = [...old, item];
          const selectedIds = newData.map((i) => i.id);
          const nameValue =
            resultType === "string" ? selectedIds.join("-") : selectedIds;
          formik.setFieldValue(name, nameValue);
          return newData;
        } else return old;
      });
    }
  };
  const handelRemovefromDelectedCatd = (id, formik) => {
    setSelected((old) => {
      const newselected = old.filter((i) => i.id != id);
      const selectedIds = newselected.map((i) => i.id);
      const nameValue =
        resultType === "string" ? selectedIds.join("-") : selectedIds;
      formik.setFieldValue(name, nameValue);
      return newselected;
    });
  };

  return (
    <div className={`col-12 ${className}`}>
      {options === "waiting..." ? (
        <SpinnerLoad isSmall={true} colorClass="text-primary" />
      ) : options != null ? (
        <FastField>
          {({ form }) => {
            return (
              <>
                <FormikControl
                  // className={className}
                  control="select"
                  options={options}
                  name="main"
                  label={label}
                  firstitem={firstitem}
                  handelOnChange={handelSelectoption}
                />

                <div className="col-12 col-md-6 col-lg-8 margin-b">
                  {selectetd.length
                    ? selectetd.map((i) => (
                        <span key={i.id} className="chips_elem">
                          <i
                            className="fas fa-times text-danger"
                            onClick={() =>
                              handelRemovefromDelectedCatd(i.id, form)
                            }
                          ></i>
                          {i.value}
                        </span>
                      ))
                    : null}
                </div>
                <ErrorMessage name={name} component={FormikError} />
              </>
            );
          }}
        </FastField>
      ) : null}
    </div>
  );
};

export default MultiSelect;
