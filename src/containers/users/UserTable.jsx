import React, { useEffect, useState } from "react";
import AddUser from "./AddUser";
import { PaginateTable } from "../../components/PaginateTable";
import ConvertDate from "../../layouts/admin/utils/ConvertDate";
import { Alert, Confirm } from "../../layouts/admin/utils/alert";
import { Actions } from "./Actions";
import { deleteUserService, getAllUsersService } from "../../services/users";

export const UserTable = () => {
  const [EditeUserId, setEditeUserId] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, [forceRender]);

  const getAllUsers = async () => {
    try {
      const res = await getAllUsersService();
      if ((res.status = 200)) setData(res.data.data);
    } catch (err) {}
  };

  const handleDeleteUser = async (itemId) => {
    if (await Confirm("حذف", "آیا از حذف مطمین هستید؟")) {
      try {
        const res = await deleteUserService(itemId);
        if ((res.status = 200))
          Alert("حدف", "رکورد مورد نظر حذف شد", "success");
      } catch (err) {}
    }
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
  ];

  const additionField = [
    {
      title: "تاریخ ایجاد",
      elements: (item) => <ConvertDate item={item.created_at} />,
    },
    {
      title: "عملیات",
      elements: (item) => (
        <Actions
          item={item}
          handleDeleteUser={handleDeleteUser}
          setEditeUserId={setEditeUserId}
        />
      ),
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
        <AddUser />
      </PaginateTable>

          </>
  );
};
