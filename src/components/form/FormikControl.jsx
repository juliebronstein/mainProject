import React from "react";
import Date from "./Date";
import File from "./File";
import Input from "./Input";
import Select from "./Select";
import Switch from "./Switch";
import Ckeditor from "./Ckeditor";
import Textarea from "./Textarea";
import InputEnter from "./InputEnter";
import MultiSelect from "./MultiSelect";
import SearchableSelect from "./SearchableSelect";
import FilterSelect from "./FilterSelect";
import Checkbox from "./CheckBox";

const FormikControl = (props) => {
  switch (props.control) {
    case "file":
      return <File {...props} />;
    case "date":
      return <Date {...props} />;
    case "input":
      return <Input {...props} />;
    case "select":
      return <Select {...props} />;
    case "switch":
      return <Switch {...props} />;
    case "checkbox":
      return <Checkbox {...props} />;
    case "ckeditor":
      return <Ckeditor {...props} />;
    case "textarea":
      return <Textarea {...props} />;  
    case "inputenter":
      return <InputEnter {...props} />;
    case "multiSelect":
      return <MultiSelect {...props} />;
    case "filterselect":
      return <FilterSelect {...props} />;
    case "searchableselect":
      return <SearchableSelect {...props} />;
    default:
      return null;
  }
};

export default FormikControl;
