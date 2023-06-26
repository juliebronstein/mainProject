import React, { useEffect, useState } from "react";
import AddBrands from "./AddBrands";
import { deleteBrandsService, getAllBrandsService } from "../../services/brands";
import ConvertDate from "../../layouts/admin/utils/ConvertDate";
import { Alert, Confirm } from "../../layouts/admin/utils/alert";
import { Actions } from "./Actions";
import { PaginateTable } from "../../components/PaginateTable";
import { apiPath } from "../../services/httpService";

const Brandstable = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [editeBrand, setEditeBrand] = useState(null);
  const [forceRender, setForceRender] = useState(0)
  
  useEffect(() => {
    hanlehetAllBrands();
  }, [forceRender]);

  const hanlehetAllBrands = async () => {
    setLoading(true);
    try {
      const res = await getAllBrandsService();
      if ((res.status = 200)) {
        setData(null)
        setData(res.data.data)
        setLoading(false);
      }
    } catch (err) {}
  };


const handleDeleteBrans=async(rowData)=>{

   if( await Confirm("حذف برند",`آیا از حذف ${rowData.original_name} اطمینان دارید؟`)){
    try{
        const res=await deleteBrandsService(rowData.id)
        
        if((res.status=200))
        {
            Alert("حذف","رکورد مورد نظر حذف شد", "success")
            data.filter(i=>i.id!==rowData.id)
        }
    }catch(err){}
   }
}
  const searchParams = {
    title: "جستجو",
    placeholdert: "قسمتی از نام را وارد نمایید",
    searchField: "original_name",
  };

  const dataInf = [
    { field: "id", title: "#" },
    { field: "original_name", title: "عنوان لاتین برند" },
    { field: "persian_name", title: "عنوان فارسی برند" },
    { field: "descriptions", title: "توضیحات"},
    {
      field: null, 
      title: "تاریخ ایجاد",
      elements: (item) => <ConvertDate item={item.created_at} />,
    },
    {
      field: null, 
      title: "تصویر",
      elements: (item) => item.logo?<img  src={apiPath+"/" +item.logo} alt="logo"  width="40" />:null
    },
    {
      field: null, 
      title: "عملیات",
         elements: (item) => (
        <Actions item={item} handleDeleteBrans={handleDeleteBrans} setEditeBrand={setEditeBrand} />
      ),
    },
  ];

  // const additionField = [
  
  // ];

  return (
    <>
    <PaginateTable
        data={data}
        dataInf={dataInf}
        searchParams={searchParams}
        loading={loading}
      >
      <AddBrands 
      editeBrand={editeBrand} 
      setEditeBrand={setEditeBrand} 
      setForceRender={setForceRender} 
      setData={setData} />
</PaginateTable>
    </>
  );
};

export default Brandstable;
