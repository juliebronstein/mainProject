import React, { useEffect, useState } from "react";
import ConvertDate from "../../layouts/admin/utils/ConvertDate";
import { Alert, Confirm } from "../../layouts/admin/utils/alert";
import { Actions } from "./Actions";
import { deleteUserService, getAllUsersService } from "../../services/users";
import AddButtonLink from "../../components/form/AddButtunLink";
import { Outlet } from "react-router-dom";
import { PaginateDataTable } from "../../components/PaginateDataTable";

export const UserTable = () => {
  const [EditeUserId, setEditeUserId] = useState(null);
  const [curentPage, setCurentPage] = useState(1); //صفحه حاضر
  const [pagesCount, setPagesCount] = useState(0); //کل صفحات
  const [countOnPage, setCountOnPage] = useState(20); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [forceRender, setForceRender] = useState(false);
  const [searchChar, setSearchChar] = useState("");
  useEffect(() => {
    getAllUsers();
  }, [forceRender]);

  const getAllUsers = async (page, count, char) => {
    try {
      setLoading(true)
      const res = await getAllUsersService();
      if ((res.status = 200)) setData(res.data.data)
    } catch (err) {}finally{setLoading(false)}
  };

  const handleDeleteUser = async (itemId) => {
    if (await Confirm("حذف", "آیا از حذف مطمین هستید؟")) {
      try {
        const res = await deleteUserService(itemId);
        if (res.status === 200)
          Alert("انجام شد", res.data.message, "success");
      } catch (err) {}
    }
  };
  const handelSearch = async (char) => {
    setSearchChar(char);
    getAllUsers(1, countOnPage, char);
  };
  const searchParams = {
    title: "جستجو",
    placeholdert: "قسمتی از نام را وارد نمایید",
    searchField: "first_name",
  };


  const dataInf = [
    { field: "id", title: "#" },
    { field: "first_name", title: "نام" },
    { field: "last_name", title: "نام خانوادگی" },
    { field: "user_name", title: "نام کاربری" },
    { field: "phone", title: "شماره تلفن" },
  
    {
      field: null,
      title: "تاریخ ایجاد",
      elements: (item) => <ConvertDate item={item.created_at} />,
    },
    {
      field: null,
      title: "عملیات",
      elements: (item) => (
        <Actions
          item={item}
          handleDeleteUser={handleDeleteUser}
        />
      ),
    },
  ];


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
        <AddButtonLink href="/users/add-user"/>
        <Outlet context={{setData}}/>
      </PaginateDataTable>

          </>
  );
};
