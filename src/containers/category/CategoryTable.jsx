import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { PaginateTable } from "../../components/PaginateTable";
import ConvertDate from "../../layouts/admin/utils/ConvertDate";
import { deleteCategoryService, getCategoriesService } from "../../services/category";
import { AddCategory } from "./AddCategory";
import { Actions } from "./tableAdditions/Action";
import { ShowInMenue } from "./tableAdditions/ShowInMenue";
import { Alert, Confirm } from "../../layouts/admin/utils/alert";

export const CategoryTable = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  //const location = useLocation();
  const [data, setData] = useState([]);
  const [forceRender, setForceRender] = useState(0);
  const [forceRenderP, setForceRenderP] = useState(0);
  const handelGetCategories = async () => {
    setLoading(true);
    try {
      const result = await getCategoriesService(
        params.categoryId ? params.categoryId : ""
      );
      if (result.status === 200) setData(result.data.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteCategory = async (rowData) => {
    if (
      await Confirm("حدف دسته بندی", `آیا از حذف ${rowData.title} مطمئن هستید؟`)
    ) {
      try {
        const res=await deleteCategoryService(rowData.id)
        if((res.status===200))
        Alert("انجام شد", res.data.message, "success");
        setData(data.filter(row=>row.id!==rowData.id))
        setForceRenderP((last) => last + 1);
      } catch(error) {
        console.log(error.message)
      }
    }
  };

  useEffect(() => {
    handelGetCategories();
  }, [params, forceRender]);

  const searchParams = {
    title: "جستجو",
    placeholdert: "قسمتی از نام را وارد نمایید",
    searchField: "title",
  };

  const dataInf = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    { field: "parent_id", title: "والد" },
    {
      field: null, 
      title: "تاریخ ایجاد",
      elements: (item) => <ConvertDate item={item.created_at} />,
    },
    {
      field: null, 
      title: "عملیات",
      elements: (item) => (
        <Actions item={item} handleDeleteCategory={handleDeleteCategory} />
      ),
    },
    {
      field: null, 
      title: "نمایش در منو",
      elements: (item) => <ShowInMenue item={item.show_in_menu} />,
    },
  ];

 
  return (
    <>
      <Outlet />
      <PaginateTable
        data={data}
        dataInf={dataInf}
        searchParams={searchParams}
        loading={loading}
      >
        <AddCategory setForceRender={setForceRender} setForceRenderP={setForceRenderP} forceRenderP={forceRenderP} />
      </PaginateTable>
    </>
  );
};
