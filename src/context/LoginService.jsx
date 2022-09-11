import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useMutation } from "react-query";

export const LoginServiceContext = createContext();

const LoginService = ({ children }) => {
  const LoginUserFetch = useMutation((data) => {
    return axios.post(
      `http://${process.env.REACT_APP_NETWORKIP}:3000/auth/login`,
      data,
      {
        withCredentials: true,
      }
    );
  });
  const sec = useMutation((data) => {
    return axios.post(`http://${process.env.REACT_APP_NETWORKIP}:3000/`, data, {
      withCredentials: true,
    });
  });

  useEffect(() => {
    const protect = async () => {
      if (document.cookie) {
        let access_token = document.cookie.match(
          /(?<=access_token=)[\s\S]+(?=;*)/
        )[0];
        sec.mutate({ access_token });
      }
    };
    protect();
  }, [document.cookie]);

  return (
    <LoginServiceContext.Provider
      value={{
        LoginUserFetch,
        sec,
      }}
    >
      {children}
    </LoginServiceContext.Provider>
  );
};

export default LoginService;
