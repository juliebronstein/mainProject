import React, { useEffect, useState } from 'react'
import { useHasPermission } from '../../hook/permissiondHook';
import { deleteDeliveryService, getAllDeliveriesService } from '../../services/delivery';
import { Alert, Confirm } from '../../layouts/admin/utils/alert';
import { Actions } from './AdditionalTable/Actions';
import { PaginateTable } from '../../components/PaginateTable';
import AddButtonLink from '../../components/form/AddButtunLink';
import { Outlet } from 'react-router-dom';

export const DeliveriesTable = () => {
    const hasPerm = useHasPermission("create_delivery");
    const [editeDeliveryId, setEditeDeliveryId] = useState(null);
    const [loading, setLoading] = useState(false);
     const [data, setData] = useState([]);
    useEffect(() => {
        handleGetDeliveries();
      }, []);
    
     
      const handleGetDeliveries = async () => {
        setLoading(true);
        try {
          const res = await getAllDeliveriesService();
          if (res.status === 200) {
            setData(res.data.data);
          }
        } catch (err) {
        } finally {
          setLoading(false);
        }
      };
    
      const handleDeleteDelivary = async (rowData) => {
        if (await Confirm("حدف ارسال", `آیا از حذف ${rowData.title} مطمئن هستید؟`)) {
          try {
            const res = await deleteDeliveryService(rowData.id);
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
        { field: "title", title: "عنوان" },
        { field: "amount", title: "هزینه" },
       
        {
          field: null,
          title: "مدت ارسال",
          elements: (item) => item.time+" "+item.time_unit
                },
        {
          field: null,
          title: "عملیات",
          elements: (item) => (
            <Actions
              item={item}
              handleDeleteDelivary={handleDeleteDelivary}
              setEditeDeliveryId={setEditeDeliveryId}
            />
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
      {hasPerm && (
       <>
       <AddButtonLink href='/deliveries/add-delivary' />
       <Outlet context={{setData}} />
       </>
      )}
    </PaginateTable>
  </>
  )
}
