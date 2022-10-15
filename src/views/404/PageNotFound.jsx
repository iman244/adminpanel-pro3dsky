import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = ({ redirectPage }) => {
    const navigate = useNavigate();
    const default_destination = "/";
    const destination = redirectPage ? redirectPage : default_destination;
    return (
        <>
            <div
                style={{
                    fontWeight: "900",
                    textTransform: "capitalize",
                    fontSize: "4rem",
                    textAlign: "center",
                }}
            >
                page not found
            </div>
            {setTimeout(() => navigate(destination), 2000)}
        </>
    );
};

export default PageNotFound;
