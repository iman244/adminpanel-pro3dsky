import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { LoginServiceContext } from "../context/LoginService";
import ReactLoading from "react-loading";
import "./reactLoadingCss.css";
import Login from "../views/Login/Login";

const ProtectedRoute = ({ children }) => {
  const { sec } = useContext(LoginServiceContext);

  return (
    <>
      {document.cookie ? (
        sec.data ? (
          sec.data.data ? (
            children ? (
              children
            ) : (
              <Outlet />
            )
          ) : children ? (
            children
          ) : (
            <Outlet />
          )
        ) : (
          <div className="loading">
            <ReactLoading
              type={"bars"}
              color={"gray"}
              height={"30%"}
              width={"30%"}
            />
          </div>
        )
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
