import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { LoginServiceContext } from "../context/LoginService";
import Login from "../views/Login/Login";

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
    const { isAllowed } = useContext(LoginServiceContext);

    useEffect(() => {}, []);

    return <>{isAllowed ? children ? children : <Outlet /> : <Login />}</>;
};

export default ProtectedRoute;
