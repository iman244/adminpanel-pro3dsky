import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { sidebarList } from "./SidebarData";

const Sidebar = () => {
    const { pathname } = window.location;
    useEffect(() => {});
    return (
        <>
            <ul className="sidebar">
                {sidebarList.map((item) => {
                    return (
                        <li key={item.id} className="sidebar">
                            <Link
                                to={item.to}
                                className={
                                    pathname === item.to
                                        ? "sidebar selected"
                                        : "sidebar"
                                }
                            >
                                <span className="sidebar">{item.name}</span>
                                <i className="sidebar fa-solid fa-angle-right"></i>
                            </Link>
                            {item.apiList && (
                                <div
                                    className={
                                        pathname.includes(item.to)
                                            ? "apiList"
                                            : "apiList close"
                                    }
                                >
                                    <ul className="apiList">
                                        {item.apiList.map((api) => {
                                            return (
                                                <li
                                                    key={api.id}
                                                    className="apiList"
                                                >
                                                    <Link
                                                        to={`${item.to}/${api.name}`}
                                                        className={
                                                            pathname ===
                                                            `${item.to}/${api.name}`
                                                                ? "apiList selected"
                                                                : "apiList"
                                                        }
                                                    >
                                                        <span className="apiList">
                                                            {api.name}
                                                        </span>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default Sidebar;
