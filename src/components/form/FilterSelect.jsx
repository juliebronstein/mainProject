// import React, { useState, useEffect } from 'react';
// const options = ['JavaScript', 'Java', 'Python', 'Ruby', 'PHP'];

// export function FilterSelect() {
//   const [inputValue, setInputValue] = useState('');
//   const [filteredOptions, setFilteredOptions] = useState([]);
//   const [display, setDisplay] = useState(false)
//   function handleInputChange(event) {
//     const value = event.target.value;
//     setInputValue(value);
//     const filtered = options.filter(option =>
//       option.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredOptions(filtered);
//   }

//   useEffect(() => {
//     (!inputValue)?setDisplay(false):setDisplay(true)

//   }, [inputValue])
  

//   return (
//     <div>
//       <input type="text" placeholder="Type to filter options" onChange={handleInputChange} />
//       <select className={display?"":"opacity_0"}>
//         {filteredOptions.map((option, index) => (
//           <option key={index} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }






import { ErrorMessage, Field } from "formik";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import FormikError from "./FromikError";

const FilterSelect = ({
  resultType,// if resultType == "string" then:  "1-2-3"  else:   [1,2,3]
  options,
  name,
  label,
  className,
  firstItem,
  initialItems //default value
}) => {
  const [selectedItems, setSelectedItems] = useState(()=>initialItems?initialItems:[]);
  const [showItems, setShowItems] = useState(false);
  const [copyOptions, setCopyOptions] = useState(options);
useEffect(() => {
  // if( initialItems)
  setSelectedItems(initialItems)
}, [initialItems])

  useEffect(() => {
    setCopyOptions(options);
   
  }, [options]);

  useEffect(() => {
    document.querySelector("body").addEventListener("click", () => {
      setShowItems(false);
    });
  }, []);

  const handleSelectItems = (selectedId, formik) => {
    if (
      selectedItems.findIndex((d) => d.id == selectedId) == -1 &&
      selectedId > 0
    ) {
      const newData = [
        ...selectedItems,
        options.filter((o) => o.id == selectedId)[0],
      ];
      setSelectedItems(newData);

      const selectedIds = newData.map((nd) => nd.id);
      const nameValue =
        resultType == "string" ? selectedIds.join("-") : selectedIds;
      formik.setFieldValue(name, nameValue);
    }
  };

  const handleRemovefromSelectedItems = (event, selectedId, formik) => {
    event.stopPropagation();
    setSelectedItems((oldData) => {
      const newData = oldData.filter((d) => d.id != selectedId);

      const selectedIds = newData.map((nd) => nd.id);
      const nameValue =
        resultType == "string" ? selectedIds.join("-") : selectedIds;
      formik.setFieldValue(name, nameValue);

      return newData;
    });
  };

  return (
    <Field>
      {({ form }) => {
        return (
          <div className={`col-12 ${className}`}>
            <div
              className="input-group mb-3 dir_ltr pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowItems(!showItems);
              }}
            >
              <div className="form-control" id={name + "-select"}>
                
                <div
                  className={`multi_select_items_content ${
                    !showItems ? "d-none" : ""
                  }`}
                >
                  <input
                    type="text"
                    className="form-control margin-t"
                    placeholder="قسمتی از عنوان مورد نظر را وارد کنید"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      setCopyOptions(
                        options.filter((o) => o.value.includes(e.target.value))
                      )
                    }
                  />
                  <ul className="p-0">
                    {copyOptions.map((o) => (
                      <li
                        key={o.id}
                        className="multi_select_items pointer"
                        onClick={() => handleSelectItems(o.id, form)}
                      >
                        {" "}
                        {o.value}{" "}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>{" "}
              <span
                htmlFor={name + "-select"}
                className="input-group-text w_6rem justify-content-center max-height"
              >
                {label}
              </span>
            </div>

            {selectedItems.length > 0 ? (
                  selectedItems.map((selectedItem) => (
                    <span className="chips_elem" key={selectedItem.id}>
                      <i
                        className="fas fa-times text-danger"
                        onClick={(e) =>
                          handleRemovefromSelectedItems(
                            e,
                            selectedItem.id,
                            form
                          )
                        }
                      ></i>
                      {selectedItem.value}
                    </span>
                  ))
                ) : (
                  <span className="text-secondary">{firstItem}</span>
                )}
            <ErrorMessage name={name} component={FormikError} />
          </div>
        );
      }}
    </Field>
  );
};

export default FilterSelect;
