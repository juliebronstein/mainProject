import React, { useEffect, useState } from 'react'
import { deleteRole, getAllRoles } from '../../services/user'
import {Actions} from './Actions'
import { PaginateTable } from '../../components/PaginateTable'
import { Alert } from 'react-bootstrap'
import { Confirm } from '../../layouts/admin/utils/alert'
import AddButtonLink from '../../components/form/AddButtunLink'
import { Outlet } from 'react-router-dom'
export const RoleTable = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
    handelGetAllRole()
}, [])



const handelDeleteRole=async(item)=>{
 try{if(await Confirm("حذف", "آیا از حذف مطمئن هستید؟")){
 
    const res=await deleteRole(item.id)
    if(res.status==200){
      Alert("انجام شد",res.data.message,"success")
      setData(data.filter(i=>i.id!=item.id))
    }
  
}}catch(err){console.log(err)}
}

const handelGetAllRole=async()=>{
        try{
            setLoading(true)
            const res=await getAllRoles()
            if(res.status==200){
            setData(res.data.data)
        }
        }catch(err){console.log(err)}finally{
            setLoading(false)
        }
    }

    const dataInf = [
        { field: "id", title: "#" },
        { field: "title", title: "عنوان" },
        { field: "description", title: "توضیحات" },
        {
          field: null,
          title: "عملیات",
          elements: (item) => (
            <Actions item={item} handelDeleteRole={handelDeleteRole}  />
          ),
        },
      ];
    
      const searchParams = {
        title: "جستجو",
        placeholdert: "قسمتی از نام را وارد نمایید",
        searchField: "title",
      };


    
  return (
    <div>   
       
    <div className="row justify-content-between">
    <PaginateTable
        data={data}
        dataInf={dataInf}
        searchParams={searchParams}
        loading={loading}
      >
         <AddButtonLink href="/roles/add-role" />
         <Outlet context={{setData}} />
      </PaginateTable>
    </div>

    
    
    
    </div>
  )
}
