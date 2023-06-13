import React, { useEffect, useState } from "react";
import Actions from "./Actions";
import { GetAllDicount, deleteDicount } from "../../services/discoints";
import { Alert, Confirm } from "../../layouts/admin/utils/alert";
import ConvertDate from "../../layouts/admin/utils/ConvertDate";
import { PaginateTable } from "../../components/PaginateTable";
import AddButtonLink from "../../components/form/AddButtunLink";
import { Outlet } from "react-router-dom";

const DiscounTstable = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const handelGetDiuscount = async () => {
    setLoading(true);
    try {
      const res = await GetAllDicount();
      if (res.status === 200) setData(() => res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleDeletediscount = async (item) => {
    if (await Confirm("حدف", "آیا از حذف خود مطمئن هستید؟")) {
      try {
        const res = await deleteDicount(item.id);
        if (res.status === 200) {
          Alert("انجام شد", res.data.message, "success");
          setData(old=>old.filter(i=>i.id!=item.id));
        }
      } catch (err) {
      } finally {
      }
    }
  };
  useEffect(() => {
    handelGetDiuscount();
  }, []);

  const searchParams = {
    title: "جستجو",
    placeholdert: "قسمتی از نام را وارد نمایید",
    searchField: "title",
  };

  const dataInf = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    { field: "code", title: "کد" },
    { field: "percent", title: "درصد تخفیف" },
    {
      field: null,
      title: "تاریخ اعتبار",
      elements: (item) => <ConvertDate item={item.expire_at} />,
    },
    {
      field: null,
      title: "برای همه",
      elements: (item) => item.for_all? "همه": "تعدادی از محصولات"
    },
    {
      field: null,
      title: "عملیات",
      elements: (item) => (
        <Actions item={item} handleDeletediscount={handleDeletediscount} />
      ),
    },
  ];


  return (
    <>
      <PaginateTable
        data={data}
        dataInf={dataInf}
        searchParams={searchParams}
        loading={loading}
      >
        <AddButtonLink href={"/discounts/add-discount"} />
        <Outlet context={{setData}} />
      </PaginateTable>
    </>
  );
};

export default DiscounTstable;
