import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./page.css";

const Page = ({ content }) => {
    const [viewPortSizeSmall, setViewPortSizeSmall] = useState(true);

    const handleView = () => {
        if (window.innerWidth <= 768) {
            setViewPortSizeSmall(true);
        } else {
            setViewPortSizeSmall(false);
        }
    };
    window.addEventListener("resize", handleView);

    useEffect(() => {
        handleView();
    }, []);

    return (
        <>
            <nav>
                <div className="nav-container">
                    <div className="nav-left">
                        <Link to="/">
                            {viewPortSizeSmall ? (
                                <i className="fa-solid fa-house logo fa-lg"></i>
                            ) : (
                                <img
                                    src="/LogoFinalCroped.png"
                                    alt="pro3dskyLogo"
                                    className="logo"
                                />
                            )}
                        </Link>
                    </div>
                    <div className="signOut">
                        {viewPortSizeSmall ? (
                            <>
                                <i className="fa-solid fa-arrow-right-from-bracket fa-lg signOut"></i>
                            </>
                        ) : (
                            <>
                                <span className="signOut">sign out</span>
                                <i className="fa-solid fa-arrow-right-from-bracket fa-lg signOut"></i>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <div className="page-content">
                <div className="page home">
                    <div className="container sidebar">
                        <Sidebar />
                    </div>
                    <div className="container main">{content}</div>
                </div>
            </div>
        </>
    );
};

export default Page;
