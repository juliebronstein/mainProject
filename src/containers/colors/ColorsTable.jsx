import React, { useEffect, useState } from "react";
import { PaginateTable } from "../../components/PaginateTable";
import { deleteColorService, getAllColorsService } from "../../services/color";
import ConvertDate from "../../layouts/admin/utils/ConvertDate";
import { Actions } from "./Actions";
import { Alert, Confirm } from "../../layouts/admin/utils/alert";
import { ConvertColor } from "./ConvertColor";
import AddColor from "./AddColor";

const ColorsTable = () => {
  const [editeColorId, setEditeColorId] = useState(null)

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    handleGetColors();
  }, []);

  const [data, setData] = useState([]);
  const handleGetColors = async () => {
    setLoading(true);
    try {
      const res = await getAllColorsService();
      if (res.status === 200) {
        // setColors(()=>{return res.data.data})
        const newdata = res.data.data;
        setData(() => {
          return newdata;
        });
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteColor = async (rowData) => {
    if (await Confirm("حدف رنگ", `آیا از حذف ${rowData.title} مطمئن هستید؟`)) {
      try {
        const res = await deleteColorService(rowData.id);
        if ((res.status = 200)) {
          Alert("انجام شد", res.data.message, "success");
          setData(data.filter((i) => i.id !== rowData.id));
        }
      } catch (err) {}
    }
  };

  const searchParams = {
    title: "جستجو",
    placeholdert: "قسمتی از نام را وارد نمایید",
    searchField: "title",
  };

  const dataInf = [
    { field: "id", title: "#" },
    { field: "title", title: "نام رنگ" },
    // { field: "code", title: "کد رنگ" },
  ];

  const additionField = [
    {
      title: "رنگ",
      elements: (item) => <ConvertColor item={item} />,
    },
    {
      title: "تاریخ ایجاد",
      elements: (item) => <ConvertDate item={item.created_at} />,
    },
    {
      title: "عملیات",
      //در پرانتز اول دریافت میکنیم و بعد میدیمش به پرانز دوم ینی به
      //addtionElement()
      //ازکجا دریافت کردیم از
      //paginateTable
      elements: (item) => (
        <Actions item={item} handleDeleteColor={handleDeleteColor} setEditeColorId={setEditeColorId} />
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
        <AddColor setData={setData} editeColorId={editeColorId} setEditeColorId={setEditeColorId} />
      </PaginateTable>
    </>
  );
};

export default ColorsTable;
