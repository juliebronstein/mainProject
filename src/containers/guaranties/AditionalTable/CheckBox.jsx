import React from "react";

const CheckBox = ({
  item,
  // datalength,
  // datadel,
  // setDatadel,
  // setCheckAll,
  handleCheck,
  ckeched
}) => {
 
  // const handleCheck = (event ,item) => {
  //   var updatedList = [...datadel];
  //   if (event.target.checked) {
  //     updatedList = [...datadel, item.id];
  //     if (updatedList.length === datalength) setCheckAll(true);
  //   } else {
  //     setCheckAll(false);
  //     updatedList.splice(datadel.indexOf(item.id), 1);
  //   }
  //   setDatadel(updatedList);
  //   console.log(datadel)
  // };

  // const ckeched = () => {
  //   const checki =
  //     datadel.length === datalength ? true : false || datadel.includes(item.id);
  //   return checki;
  // };
  
  return (

    <input
    className="pointer"
      type="checkbox"
      name={item?item.id:"all"}
      onChange={(e)=> handleCheck(e,item?item:null)}
      checked={ckeched(item?item:null)}
      // disabled={item?((item.id%2===0)?true:false):false}
    />

  );
};

export default CheckBox;
