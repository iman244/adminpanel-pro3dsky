import React, { createContext, useEffect } from "react";
import { useMutation } from "react-query";

export const LoginServiceContext = createContext();

const LoginService = ({ children }) => {
  const LoginUserFetch = useMutation((data) => {
    return fetch(`http://${process.env.REACT_APP_NETWORKIP}/auth/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  const sec = useMutation(async (data) => {
    let response = await fetch(`http://${process.env.REACT_APP_NETWORKIP}`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
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
