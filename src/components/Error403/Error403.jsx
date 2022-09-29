import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../Services/AppService";
import "./error403.css";

const Error403 = () => {
  const { logOut } = useContext(AppContext);
  useEffect(() => {
    logOut.mutate();
  }, []);
  return (
    <>
      <p className="error">
        Your session is expired! you will redirect to login page
      </p>
    </>
  );
};

export default Error403;
