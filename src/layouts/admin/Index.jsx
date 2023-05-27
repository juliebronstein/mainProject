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
