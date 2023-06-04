import React, { useEffect, useState } from 'react';
import AddDiscount from './AddDiscount';
import Actions from './Actions';
import { GetAllDicount, deleteDicount } from '../../services/discoints';
import { ShowInMenue } from '../category/tableAdditions/ShowInMenue';
import { Alert, Confirm } from '../../layouts/admin/utils/alert';
import ConvertDate from '../../layouts/admin/utils/ConvertDate';
import { PaginateTable } from '../../components/PaginateTable';

const DiscounTstable = () => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const handelGetDiuscount=async()=>{
        setLoading(true)
        try{
            const res=await GetAllDicount()
            if(res.status==200) setData(()=>res.data.data)
        }catch(err){console.log(err)}
        finally {setLoading(false)}
    }
    const handleDeletediscount=async(item)=>{
        if(await Confirm("حدف","آیا از حذف خود مطمئن هستید؟")){
          try{
            const res=await deleteDicount(item.id)
            if(res.status==200){
              Alert("انجام شد",res.data.message,"success")
              setData((oldData)=>{
                const newdata=oldData
                newdata.filter(i=>i.id!=item.id)
                return newdata
              })
            }
          }catch(err){}finally{}
        }
    }
    useEffect(() => {
      handelGetDiuscount()
    }, [])
    

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
        
      ];
    
      const additionField = [
        {
          title:  "تا تاریخ" ,
          elements: (item) => <ConvertDate item={item.expire_at} />,
        },
        // {
        //   title: "تاریخ ایجاد",
        //   elements: (item) => <ConvertDate item={item.created_at} />,
        // },
        {
          title: "برای همه",
          elements: (item) => <ShowInMenue item={item.for_all} />,
        },
        {
          title: "عملیات",
          elements: (item) => (
            <Actions item={item} handleDeletediscount={handleDeletediscount} />
          ),
        },
      ];




    return (
        <>
             <div className="row justify-content-between dir_ltr">
         <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
               <AddDiscount Link='/discounts/add-discount' />
            </div>
            
      </div>
      <PaginateTable
        data={data}
        dataInf={dataInf}
        additionField={additionField}
        searchParams={searchParams}
        loading={loading}
      />
        </>
    );
}

export default DiscounTstable;
