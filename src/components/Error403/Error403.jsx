import React from "react";
import "./error403.css";

const Error403 = () => {
  return (
    <>
      <p className="error">
        Your session is expired! you will redirect to login page
      </p>
      {setTimeout(() => window.location.reload(), 2000)}
    </>
  );
};

export default Error403;
