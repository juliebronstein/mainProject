import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Loading } from "../../components/autForm/Loading";
import { Content } from "../../containers/Content";
import { AdminContextContainer } from "../../context/AdminLayoutContext";
import { useIsLogin } from "../../hook/authHook";

import { Navbar } from "./header/Navbar";
import { Sidbar } from "./sidbar/Sidbar";

export const Index = () => {
  const [loading, isLogin] = useIsLogin()
  // const {roles,error}=useSelector(state=>state.rolesReducer)
  // const dispatch=useDispatch()
  // useEffect(() => {
  //  dispatch(getRolesActionRedux())
  //  console.log("roles",roles)
  // }, [])
  
  return (
    <AdminContextContainer>
      {loading ? (
        <Loading/>
      ) : isLogin ? (
        <div>
          <Content />
          <Sidbar />
          <Navbar />
        </div>
      ) : (
        <Navigate to={"auth/login"} />
      )}
    </AdminContextContainer>
  );
};
