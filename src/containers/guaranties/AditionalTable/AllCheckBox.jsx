import React from "react";

//  const AllCheckBox = ({item, datadel,setDatadel,data }) => {
const AllCheckBox = ({
  // data,
  // setDatadel,
  checkAll,
  // setCheckAll,
  handleCheckAll,
}) => {
  // const handleCheckAll = (event) => {
  //   setDatadel([]);
  //   var updatedList = [];
  //   if (event.target.checked) {
  //     data.map((i) => (updatedList = [...updatedList, i.id]));
  //     setDatadel(updatedList);
  //     setCheckAll(true);
  //   } else {
  //     setCheckAll(false);
  //   }
  // };

  return (
    <input
      type="checkbox"
      onChange={(e) => handleCheckAll(e)}
      checked={checkAll}
    />
  );
};

export default AllCheckBox;
