import React, { useEffect, useState } from "react";
import {
  deleteAttributeService,
  getCategoryAttributes,
} from "../../../services/attributes";
import { useLocation, useParams } from "react-router-dom";
import { PaginateTable } from "../../../components/PaginateTable";
import ConvertDate from "../../../layouts/admin/utils/ConvertDate";
import { Actions } from "./AttrAcrion";
import { ShowInfilter } from "./ShowInFilter";
import { Alert, Confirm } from "../../../layouts/admin/utils/alert";
import { PrevPageButton } from "../../../components/PrevPageButton";

import { AddAttr } from "./AddAttr";
import { useHasPermission } from "../../../hook/permissiondHook";

const Attributes = () => {
  const hasPerm=useHasPermission("create_category")
  const [data, setData] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [reinitialValues, setReinitialValues] = useState(null);
  const [editeAttr, setEditeAttr] = useState(null);
  const params = useParams();
  useEffect(() => {
    handelGetAttributes();
  }, []);

  useEffect(() => {
    if (editeAttr)
      setReinitialValues({
        title: editeAttr.title,
        unit: editeAttr.unit,
        in_filter: editeAttr.in_filter ? true : false,
      });
    else setReinitialValues(null);
  }, [editeAttr]);

  // useEffect(() => {
  //   if (editeItem)
  //     setReinitialValues({
  //       title: editeItem.title,
  //       unit: editeItem.unit,
  //       in_filter: editeItem.in_filter ? true : false,
  //     });
  //   console.log(reinitialValues);
  // }, [editeItem]);

  const handelGetAttributes = async () => {
    setLoading(true);
    try {
      const result = await getCategoryAttributes(
        params.categoryId ? params.categoryId : ""
      );
      if (result.status === 200) setData(result.data.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteAttribute = async (rowData) => {
    if (
      await Confirm(
        "حدف ویژگی",
        `آیا از حذف ویژگی ${rowData.title} مطمئن هستید؟`
      )
    ) {
      try {
        const res = await deleteAttributeService(rowData.id);
        if (res.status === 200) Alert("انجام شد", res.data.message, "success");
        setData(data.filter((row) => row.id !== rowData.id));
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const searchParams = {
    title: "جستجو",
    placeholdert: "قسمتی از نام را وارد نمایید",
    searchField: "title",
  };

  const dataInf = [
    { field: "id", title: "#" },
    { field: "title", title: "عنوان محصول" },
    { field: "unit", title: "واحد" },
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
          handleDeleteAttribute={handleDeleteAttribute}
          attrToEdite={editeAttr}
          setAttrToEdite={setEditeAttr}
        />
      ),
    },
    {
      field: null, 
      title: "نمایش در فیلتر",
      elements: (item) => <ShowInfilter item={item} />,
    },
  ];


  return (
    <>
      <h4 className="text-center my-3">مدیریت ویژگی های دسته بندی</h4>
      <h5 className="text-center my-3">
        ویژگی های:
        <span className="text-primary">
          {location.state.categoryData.title}
        </span>
      </h5>

      <div className={`container `}>
        <div className="row justify-content-center">
         {hasPerm && <AddAttr
            editeAttr={editeAttr}
            setEditeAttr={setEditeAttr}
            location={location}
            setData={setData}
            reinitialValues={reinitialValues}
          />}

          <hr />
          <PaginateTable
            data={data}
            dataInf={dataInf}
            searchParams={searchParams}
            loading={loading}
          >
            <PrevPageButton />
          </PaginateTable>
        </div>
      </div>
    </>
  );
};

export default Attributes;
