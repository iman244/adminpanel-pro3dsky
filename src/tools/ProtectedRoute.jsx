import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { LoginServiceContext } from "../context/LoginService";
import ReactLoading from "react-loading";
import "./reactLoadingCss.css";
import Login from "../views/Login/Login";

const ProtectedRoute = ({ children }) => {
    const { sec } = useContext(LoginServiceContext);

    useEffect(() => {});

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
                    ) : (
                        <Login />
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
                <Login />
            )}

            {/* {sec.isIdle ? (
                <>
                    {console.log(1)}
                    <Login />
                </>
            ) : !sec.isSuccess ? (
                <div className="loading">
                    {console.log(2)}
                    <ReactLoading
                        type={"bars"}
                        color={"gray"}
                        height={"100%"}
                        width={"100%"}
                    />
                </div>
            ) : sec.data.data ? (
                children ? (
                    children
                ) : (
                    <Outlet />
                )
            ) : (
                <>
                    {console.log(4)}
                    <Login />
                </>
            )} */}
        </>
    );
};

export default ProtectedRoute;
