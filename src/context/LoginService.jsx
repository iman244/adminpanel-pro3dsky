import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useMutation } from "react-query";

export const LoginServiceContext = createContext();
const LoginService = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAllowed, setIsAllowed] = useState(null);
    const LoginUserFetch = useMutation((data) => {
        return axios.post("http://127.0.0.1:3000/auth/login", data, {
            withCredentials: true,
        });
    });
    const sec = useMutation((data) => {
        return axios.post("http://127.0.0.1:3000/", data, {
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
        if (sec.isSuccess) {
            setIsAllowed(sec.data.data);
        }
    }, [document.cookie]);

    return (
        <LoginServiceContext.Provider
            value={{
                user,
                setUser,
                isAllowed,
                setIsAllowed,
                LoginUserFetch,
                sec,
            }}
        >
            {children}
        </LoginServiceContext.Provider>
    );
};

export default LoginService;
