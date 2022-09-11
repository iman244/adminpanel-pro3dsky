import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const home = () => {
  return (
    <div className="landing">
      <Link to="users" className="landing user">
        <i className="fa-solid fa-user user"></i>
        <span className="user">manage users</span>
      </Link>
      <Link to="design" className="landing design">
        <i className="fa-solid fa-chair design"></i>
        <span className="design">manage designs</span>
      </Link>
    </div>
  );
};

export default home;
