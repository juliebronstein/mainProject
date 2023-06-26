import React, { useEffect, useState } from "react";
import ConvertDate from "../../layouts/admin/utils/ConvertDate";
import { Alert, Confirm } from "../../layouts/admin/utils/alert";
import { Actions } from "./Actions";
import { deleteUserService, getAllUsersService } from "../../services/users";
import AddButtonLink from "../../components/form/AddButtunLink";
import { Outlet } from "react-router-dom";
import { PaginateDataTable } from "../../components/PaginateDataTable";
import { Roles } from "./Roles";
import { useHasPermission } from "../../hook/permissiondHook";

export const UserTable = () => {
  const hasPerm=useHasPermission("create_user")
  const [EditeUserId, setEditeUserId] = useState(null);
  const [curentPage, setCurentPage] = useState(1); //صفحه حاضر
  const [pagesCount, setPagesCount] = useState(0); //کل صفحات
  const [countOnPage, setCountOnPage] = useState(20);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [forceRender, setForceRender] = useState(false);
  const [searchChar, setSearchChar] = useState("");
  useEffect(() => {
    getAllUsers(curentPage, countOnPage, searchChar);
  }, []);

  const getAllUsers = async (page, count, char) => {
    try {
      setLoading(true);
      const res = await getAllUsersService(page, count, char);
      if ((res.status = 200)) setData(res.data.data.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (itemId) => {
    if (await Confirm("حذف", "آیا از حذف مطمین هستید؟")) {
      try {
        const res = await deleteUserService(itemId);
        if (res.status === 200) {
          Alert("انجام شد", res.data.message, "success");
          getAllUsers(curentPage, countOnPage, searchChar);
          // setData(data.filter(i=>i.id!=itemId))
        }
      } catch (err) {}
    }
  };
  const handelSearch = async (char) => {
    setSearchChar(char);
    getAllUsers(1, countOnPage, char);
  };
  const searchParams = {
    title: "جستجو",
    placeholdert: "قسمتی از شماره تماس یا ایمیل را وارد نمایید",
    searchField: "first_name",
  };

  const dataInf = [
    { field: "id", title: "#" },
    { field: "user_name", title: "نام کاربری" },
    {
      field: null,
      title: "نام",
      elements: (item) => `${item.first_name || ""} ${item.last_name || ""}`,
    },
    {
      field: null,
      title: "نقش",
      elements: (item) => <Roles item={item} />,
    },
    { field: "phone", title: "شماره تلفن" },
    { field: "email", title: "ایمیل" },

    {
      field: null,
      title: "تاریخ ایجاد",
      elements: (item) => <ConvertDate item={item.created_at} />,
    },
    {
      field: null,
      title: "جنسیت",
      elements: (item) => (item.gender ? "آقا" : "خانم"),
    },
    {
      field: null,
      title: "عملیات",
      elements: (item) => (
        <Actions item={item} handleDeleteUser={handleDeleteUser} />
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
        { hasPerm && <>
        <AddButtonLink href="/users/add-user" />
        <Outlet context={{ setData }} />
        </>}
      </PaginateDataTable>
    </>
  );
};
