import React, { useEffect, useState } from "react";
import { Actions } from "./Actions";
import {
  deleteProductService,
  getProductsService,
} from "../../services/product";
import { PaginateDataTable } from "../../components/PaginateDataTable";
import { Alert, Confirm } from "../../layouts/admin/utils/alert";
import { Link } from "react-router-dom";
import { AddButtunLink } from "../../components/form/AddButtunLink";
export const TableProduct = () => {
  const [loading, setLoading] = useState(false);
  const [curentPage, setCurentPage] = useState(1); //صفحه حاضر
  const [pagesCount, setPagesCount] = useState(0); //کل صفحات
  const [countOnPage, setCountOnPage] = useState(2); //تعداد ذر هر صفحه
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
    // { field: null, title: "j",elements:()=>j++ },
    { field: "id", title: "#" },
    {
      field: null,
      title: "گروه محصول",
      elements: (item) => item.categories[0].title,
    },
    { field: "title", title: "عنوان" },
    { field: "price", title: "قیمت" },
    { field: "stock", title: "موجودی" },
    { field: "like_count", title: "تعداد لایک" },
    {
      field: null,
      title: "عملیات",
      elements: (item) => (
        <Actions item={item} handelDeleteProduct={handelDeleteProduct} />
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
        <AddButtunLink link={"/product/add-product"} />
      </PaginateDataTable>
    </>
  );
};
