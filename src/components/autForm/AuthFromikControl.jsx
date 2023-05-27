import React from "react";

import  Switch  from "../form/Switch";
import Input from "./Input";
// import { Array } from "./Array";
// import Checkbox from "./CheckBox";
// import { Date } from "./Date";
// import File from "./File";
// import { Radio } from "./Radio";
// import { Select } from "./Select";


const AuthFormikControl = (props) => {
  switch (props.control) {
    case "input":
      return <Input {...props} />;
    case "switch":
      return <Switch {...props} />;
    // case "persnoalArray":
    //   return <Array {...props} />;
    // case "select":
    //   return <Select {...props} />;
    // case "radio":
    //   return <Radio {...props} />;
    // case "chekbox":
    //   return <Checkbox {...props} />;
    //   case 'date':
    //     return <Date {...props} />
    //   case 'file':
    //     return <File {...props} />
    default:
      return null;
  }
};

export default AuthFormikControl;
