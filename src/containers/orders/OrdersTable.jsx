import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { deleteOrderService, getAllPaginatedOrdersService } from '../../services/orders';
import { PaginateDataTable } from '../../components/PaginateDataTable';
import AddButtonLink from '../../components/form/AddButtunLink';
import { Alert, Confirm } from '../../layouts/admin/utils/alert';
import ConvertDate, { convertDateToJalali } from '../../layouts/admin/utils/ConvertDate';
import { numberWithCommas } from '../../layouts/admin/utils/number';
import Actions from './TableAdditional/Actions';

const OrdersTable = () =>  {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchChar, setSearchChar] = useState("") 
    const [currentPage, setCurrentPage] = useState(1) // صفحه حال حاضر
    const [countOnPage, setCountOnPage] = useState(10) // تعداد محصول در هر صفحه
    const [pageCount, setPageCount] = useState(0) // تعداد کل صفحات
  
    const dataInfo = [
      { field: "id", title: "#" },
      { field: "user_id", title: "آی دی کاربر" },
      {
        field: null,
        title: "نام کاربر",
        elements: (rowData) => `${rowData.user.first_name || ""} ${rowData.user.last_name || ""}`,
      },
      {
        field: null,
        title: "موبایل کاربر",
        elements: (rowData) => rowData.user.phone,
      },
      { field: "cart_id", title: "کد سبد" },
      {
        field: null,
        title: "تاریخ پرداخت",
        elements: (rowData) => ConvertDate(rowData.pay_at)
      },
      {
        field: null,
        title: "مبلغ پرداختی",
        elements: (rowData) => numberWithCommas(rowData.pay_amount),
      },
      {
        field: null,
        title: "عملیات",
        elements: (rowData) => <Actions rowData={rowData} handleDeleteOrder={handleDeleteOrder}/>,
      },
    ];

    const searchParams = {
      title: "جستجو",
      placeholder: "قسمتی از شماره تماس کاربر را وارد کنید",
    };
  
    const handleGetOrders = async (page=currentPage, count=countOnPage, char=searchChar)=>{
      setLoading(true)
      const res = await getAllPaginatedOrdersService(page, count, char)
      setLoading(false)
      if (res.status === 200) {
        setData(res.data.data.data)
        setPageCount(res.data.last_page)
      }
    }
  
    const handleSearch = (char)=>{
      setSearchChar(char)
      handleGetOrders(1, countOnPage, char)
    }
  
    const handleDeleteOrder = async (order)=>{
      if (await Confirm("حذف سفارش",`آیا از حذف ${order.id} اطمینان دارید؟`)) {
        const res = await deleteOrderService(order.id);
        if (res.status === 200) {
          Alert("انجام شد", res.data.message, "success");
          handleGetOrders()
        }
      }
    }

    useEffect(()=>{
        handleGetOrders()
    },[currentPage])
  
    return (
        <PaginateDataTable
        initData={data}
        dataInf={dataInfo}
        searchParams={searchParams}
        loading={loading}
        pagesCount={pageCount}
        curentPage={currentPage}
        setCurentPage={setCurrentPage}
        handelSearch={handleSearch}
      >
       
        <AddButtonLink href={"/orders/add-order"}/>
        <Outlet context={{handleGetOrders}}/>
      </PaginateDataTable>
    );
  };


export default OrdersTable;