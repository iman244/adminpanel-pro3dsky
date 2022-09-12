import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./page.css";
import SidebarMenu from "./SidebarMenu/SidebarMenu";

const Page = ({ content }) => {
  const [viewPortSizeSmall, setViewPortSizeSmall] = useState(true);
  const [sidebarMenuShow, setSidebarMenuShow] = useState(false);

  const handleView = () => {
    if (window.innerWidth <= 576) {
      setViewPortSizeSmall(true);
    } else {
      setViewPortSizeSmall(false);
    }
  };
  window.addEventListener("resize", handleView);

  const handleSignOut = () => {
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };

  useEffect(() => {
    handleView();
  }, []);

  useEffect(() => {
    if (document.cookie) {
      let access_token = document.cookie.match(
        /(?<=access_token=)[\s\S]+(?=;*)/
      )[0];
      if (!access_token) {
        alert("Your session is expired! please login again");
        window.location.reload();
      }
    } else {
      alert("Your session is expired! please login again");
      window.location.reload();
    }
  });

  return (
    <>
      <nav>
        <div className="nav-container">
          <div className="nav-left">
            <Link to="/">
              {false ? (
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
          {viewPortSizeSmall ? (
            <>
              <i
                className="fa-solid fa-bars fa-xl menu"
                onClick={() => setSidebarMenuShow(!sidebarMenuShow)}
              ></i>
            </>
          ) : (
            <div className="signOut" onClick={handleSignOut}>
              <span className="signOut">sign out</span>
              <i className="fa-solid fa-arrow-right-from-bracket fa-lg signOut"></i>
            </div>
          )}
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
      <SidebarMenu
        show={sidebarMenuShow}
        setShow={setSidebarMenuShow}
        handleSignOut={handleSignOut}
      />
    </>
  );
};

export default Page;
