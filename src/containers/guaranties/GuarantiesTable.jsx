import React, { useEffect, useState } from "react";
import AddGuaranty from "./AddGuaranty";
import { Actions } from "./Actions";
import {
  deleteGuarantyService,
  getAllGuarantysService,
} from "../../services/guaranties";
import { PaginateTable } from "../../components/PaginateTable";
import { Alert, Confirm } from "../../layouts/admin/utils/alert";
import CheckBox from "./AditionalTable/CheckBox";

const GuarantiesTable = () => {
  const [data, setData] = useState([]);
  const [datadel, setDatadel] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [editeGuarantyId, setEditeGuarantyId] = useState(null);
  const [loading, setLoading] = useState(false);
  // var j=1



  useEffect(() => {
    handleGetallGuaranty();
  }, []);
  const handleDeletGuaranty = async (itemId) => {
    if (await Confirm("حذف", "آیا از حذف مطمئن هستید")) {
      const res = await deleteGuarantyService(itemId);
      if ((res.status = 200)) Alert("حذف", "حذف انجام شد", "success");
      setData(data=>data.filter((i) => i.id !== itemId))
    }
  };
  const handleGetallGuaranty = async () => {
    setLoading(true);
    try {
      const res = await getAllGuarantysService();
      if ((res.status = 200)) {
        setData(res.data.data);
      }
      setLoading(false);
    } catch (err) {}
  };
  const searchParams = {
    title: "جستجو",
    placeholdert: "قسمتی از نام را وارد نمایید",
    searchField: "title",
  };

  const dataInf = [
    // { field: "id", title: "#" },
    { field: "title", title: "عنوان گارانتی" },
    { field: "descriptions", title: " توضیحات اجمالی در مورد این گارانتی" },
    { field: "length_unit", title: "واحد" },
    { field: "length", title: "مدت گارانتی" },
  ];
  const handleCheck = (event ,item) => {
    var updatedList = [...datadel];
    if (event.target.checked) {
      updatedList = [...datadel, item.id];
      if (updatedList.length === data.length) setCheckAll(true);
    } else {
      setCheckAll(false);
      updatedList.splice(datadel.indexOf(item.id), 1);
    }
    setDatadel(updatedList);

  };

  const ckeched = (item) => {
    const checki =
      datadel.length === data.length ? true : false || datadel.includes(item.id);
    return checki;
  };
  const ckechedAll=()=>{
    return checkAll
  }
  const handleCheckAll = (event) => {
    setDatadel([]);
    var updatedList = [];
    if (event.target.checked) {
      data.map((i) => (updatedList = [...updatedList, i.id]));
      setDatadel(updatedList);
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  
  };
  const additionField = [
    {
      title: "عملیات",
      elements: (item) => (
        <Actions
          item={item}
          handleDeleteGuaranty={handleDeletGuaranty}
          setEditeGuarantyId={setEditeGuarantyId}
        />
      ),
    },
    // {
    //   title: "#",
    //   elements: (item) => (
    //     <>{j++} </>
    //   ),
    // },
    {
      title:<CheckBox
      
      // data={data}
      // setDatadel={setDatadel}
      // checkAll={checkAll}
      //  setCheckAll={setCheckAll}
      handleCheck={handleCheckAll}
       ckeched={ckechedAll}
       />,
       elements: (item) =><CheckBox 
       item={item}
      //  datalength={data.length}
      //  datadel={datadel}
      //  setDatadel={setDatadel} 
      //  setCheckAll={setCheckAll}
       handleCheck={handleCheck}
       ckeched={ckeched}
             />,
    },

  ];


  
  return (
    <>
      <PaginateTable
        data={data}
        dataInf={dataInf}
        additionField={additionField}
        searchParams={searchParams}
        loading={loading}
      >
        <AddGuaranty
          editeGuarantyId={editeGuarantyId}
          setEditeGuarantyId={setEditeGuarantyId}
          setData={setData}
        />
      </PaginateTable>
    </>
  );
};

export default GuarantiesTable;
