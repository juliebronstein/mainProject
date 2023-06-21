
import { useEffect, useState } from "react";
import { getUserService } from "../services/auth";
import { useDispatch } from "react-redux";
import { reciveUserResponse } from "../containers/redux/user/userAction";

export const useIsLogin = ()=>{
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch=useDispatch()
    const handelCheckLogin= async()=>{
      
      try {
        const res=await getUserService()
        setIsLogin(res.status === 200 ? true : false);
        setLoading(false);
        const user=res.data
        //trim means without any space
        //for example
        //"" ""=>""
        const full_name=`${user.first_name||""} ${user.last_name||""}`.trim()
        user.full_name=full_name|| user.user_name
        dispatch(reciveUserResponse(user));
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