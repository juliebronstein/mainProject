import React, { useEffect, useState } from "react";
import { getAllPermissions } from "../../services/user";
import { PaginateTable } from "../../components/PaginateTable";

const PermissionsTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const dataInf = [
      { field: "id", title: "#" },
      { field: "title", title: "عنوان" },
      { field: "description", title: "توضیحات" },
      { field: "category", title: "عنوان دسته" }      
    ];
  
    const searchParams = {
      title: "عنوان",
      placeholder: "قسمتی از عنوان را وارد کنید",
      searchField: "description",
    };
  
    const handleGetAllPermissions = async ()=>{
      setLoading(true)
      const res = await getAllPermissions();
      res && setLoading(false)
      if (res.status === 200) {
          setData(res.data.data);
      }
    }
  
    useEffect(()=>{
        handleGetAllPermissions()
    },[])
  return (
    <PaginateTable
    data={data}
    dataInf={dataInf}
    searchParams={searchParams}
    loading={loading}
  />
  );
};

export default PermissionsTable;