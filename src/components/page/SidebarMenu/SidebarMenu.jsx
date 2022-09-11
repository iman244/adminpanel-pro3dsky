import React from "react";
import { Link } from "react-router-dom";
import "./sidebarMenu.css";

const SidebarMenu = ({ show, setShow, handleSignOut }) => {
  return (
    <div
      style={{
        width: `${show ? "100vw" : "0"}`,
        opacity: `${show ? "1" : "0"}`,
      }}
      className="sidebarMenu"
      onClick={() => {
        setShow(!show);
      }}
    >
      <div className="content">
        <Link to="/">home</Link>
        <Link to="/users">users</Link>
        <Link to="/design">design</Link>
        <div className="signOut" onClick={handleSignOut}>
          <span className="signOut">sign out</span>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
