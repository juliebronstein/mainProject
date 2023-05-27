
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loading } from "../../components/autForm/Loading";
import { Alert } from "../../layouts/admin/utils/alert";
import { logoutService } from "../../services/auth";

export const Logout = () => {
  const [loading, setLoading] = useState(true);
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));

  const handelLogout= async()=>{
    try {
       const result=await logoutService()
       if (result.status === 200) {
        localStorage.removeItem("loginToken");
      } else {
        Alert("...!", result.data.message, "error");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message)
      if (error.response.status !== 401)
       Alert("...!", "مشکلی از سمت سرور رخ داده است", "error");
    }
   
  }
  useEffect(() => {
    if (loginToken) {
      handelLogout()
      
    }
  }, []);
  return <>{loading ? <Loading /> : <Navigate to={"/auth/login"} />}</>;
};
