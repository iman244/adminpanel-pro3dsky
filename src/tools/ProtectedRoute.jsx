import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Page from "../components/page/Page";
import { LoginServiceContext } from "../context/LoginService";
import Login from "../views/Login/Login";
import Users from "../views/Users/Users";

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
    const { isAllowed } = useContext(LoginServiceContext);

    useEffect(() => {}, []);

    return <>{isAllowed ? children ? children : <Outlet /> : <Login />}</>;
};

export default ProtectedRoute;
