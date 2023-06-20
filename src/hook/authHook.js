import axios from "axios";
import { useEffect, useState } from "react";
import { getUserService } from "../services/auth";
import { useDispatch } from "react-redux";
import {  receiveRolesResponse } from "../containers/redux/roles/roleAction";

export const useIsLogin = ()=>{
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch=useDispatch()
    const handelCheckLogin= async()=>{
      
      try {
        const res=await getUserService()
        setIsLogin(res.status === 200 ? true : false);
        setLoading(false);
        dispatch(receiveRolesResponse(res.data.roles));
      } catch (error) {
        localStorage.removeItem("loginToken");
            setIsLogin(false);
            setLoading(false)
      }
    }
    useEffect(() => {
      
      const loginToken = JSON.parse(localStorage.getItem("loginToken"));


      if (loginToken) {
       handelCheckLogin()
      } else {
        setIsLogin(false);
        setLoading(false);
      }
    }, []);

    return [loading, isLogin]
}