import React, { useEffect, useState } from "react";
import { Actions } from "./Actions";
import {
  deleteProductService,
  getProductsService,
  setToggleNotificationService,
} from "../../services/product";
import { PaginateDataTable } from "../../components/PaginateDataTable";
import { Alert, Confirm } from "../../layouts/admin/utils/alert";
import AddButtonLink from "../../components/form/AddButtunLink";
import { useHasPermission } from "../../hook/permissiondHook";
export const TableProduct = () => {
  const hasPerm = useHasPermission("create_product");
  const [loading, setLoading] = useState(false);
  const [curentPage, setCurentPage] = useState(1); //صفحه حاضر
  const [pagesCount, setPagesCount] = useState(0); //کل صفحات
  const [countOnPage, setCountOnPage] = useState(20); //تعداد ذر هر صفحه
  const [data, setData] = useState([]);
  const [searchChar, setSearchChar] = useState("");
  // let j=8

  const handleGetProducts = async (page, count, char) => {
    setLoading(true);
    const res = await getProductsService(page, count, char);
    res && setLoading(false);
    if ((res.status = 200)) {
      setData(res.data.data);
      setPagesCount(res.data.last_page);
    }
  };
  const handelToggleNot = async (item) => {
    const res = await setToggleNotificationService(item.id);
    if (res.status === 200)
   { 
    console.log(res)
  
    Alert(
        "انجام شد",
        `${
          res.data.data === false
            ? "محصول به لیست محصولات رو به پایان اضافه شد"
            : "محصول از لیست محصولات رو به پایان حذف شد"
        }`,
        "success"
      );
      const index=data.findIndex(i=>i.id==item.id)
setData(old=>{
  console.log(old[index])
  return old[index].has_notification=1
})
      // setData(old=>{
      //   const newData=[...old]
      //   const index=newData.findIndex(i=>i.id==item.id)
      //   console.log("index",index)
      //   console.log("beore",newData[index].has_notification)
      //   newData[index].has_notification= newData[index].has_notification?0:1
      //   console.log("after",newData[index].has_notification)
      //   return newData
      // }) 
    }
  };
  const handelSearch = async (char) => {
    setSearchChar(char);
    handleGetProducts(1, countOnPage, char);
  };

  const handelDeleteProduct = async (item) => {
    if (await Confirm("حذف", "آیا از حذف مطمئن هستید؟")) {
      try {
        const res = await deleteProductService(item.id);
        if ((res.status = 200)) {
          Alert("انجام شد", res.data.message, "success");
          handleGetProducts(curentPage, countOnPage, searchChar);
        }
      } catch (err) {}
    }
  };
  useEffect(() => {
    handleGetProducts(curentPage, countOnPage, searchChar);
  }, [curentPage]);

  const dataInf = [
    { field: "id", title: "#" },
    {
      field: null,
      title: "گروه محصول",
      elements: (item) => item.categories[0]?.title,
    },
    { field: "title", title: "عنوان" },
    { field: "price", title: "قیمت" },
    { field: "stock", title: "موجودی" },
    { field: "like_count", title: "تعداد لایک" },
    {
      field: null,
      title: "عملیات",
      elements: (item) => (
        <Actions
          item={item}
          handelDeleteProduct={handelDeleteProduct}
          handelToggleNot={handelToggleNot}
        />
      ),
    },
  ];

  const searchParams = {
    title: "جستجو",
    placeholdert: "قسمتی از نام را وارد نمایید",
    searchField: "title",
  };

  return (
    <>
      <PaginateDataTable
        initData={data}
        dataInf={dataInf}
        searchParams={searchParams}
        loading={loading}
        pagesCount={pagesCount}
        curentPage={curentPage}
        setCurentPage={setCurentPage}
        handelSearch={handelSearch}
      >
        {hasPerm && <AddButtonLink href={"/product/add-product"} />}
      </PaginateDataTable>
    </>
  );
};
