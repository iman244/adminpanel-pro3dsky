import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

export const UsersContext = createContext();

const getAllUsersFetch = async (keyword = "", page = 1, limit = 1) => {
    const response = await fetch(
        `${process.env.REACT_APP_NETWORKIP}/users?keyword=${keyword}&page=${page}&limit=${limit}`,
        { method: "GET", credentials: "include" }
    );
    return response.json();
};

const UsersService = ({ children }) => {
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState("");
    const [usersChanged, setUsersChanged] = useState(1);
    const itemsPerPage = 20;
    const { isLoading, isError, status, error, data } = useQuery(
        ["users", page, keyword, usersChanged],
        () => getAllUsersFetch(keyword, page, itemsPerPage)
    );

    const usersCount = status === "success" ? data.totalUsers : 1;

    useEffect(() => {
        setPage(1);
    }, [keyword]);

    return (
        <UsersContext.Provider
            value={{
                isLoading,
                isError,
                error,
                data,
                status,
                page,
                setPage,
                itemsPerPage,
                usersCount,
                keyword,
                setKeyword,
                setUsersChanged,
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};

export default UsersService;
