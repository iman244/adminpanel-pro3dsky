import React from "react";
import "./error403.css";

const Error403 = () => {
  return (
    <>
      <p className="error">
        Your session is expired! you will redirect to login page
      </p>
      {
        console.log("error 403 relaod")
        /* {setTimeout(() => window.location.reload(), 2000)} */
      }
    </>
  );
};

export default Error403;
