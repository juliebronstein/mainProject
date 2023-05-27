import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loading } from "../../components/autForm/Loading";
import Login from "../../containers/auth/login";
import { useIsLogin } from "../../hook/authHook";
export const AuthLayout = () => {
  const [loading, isLogin] = useIsLogin();
  return (
    <>
      {loading ? (
        <Loading />
      ) : !isLogin ? (
        <div className="limiter">
          <div className="container-login100">
            <Routes>
              <Route path="/auth/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};
