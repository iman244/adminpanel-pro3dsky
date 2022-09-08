import React, { createContext, useState } from "react";
import { useQuery } from "react-query";

export const UsersContext = createContext();

const getAllUsersFetch = async (page = 1, limit = 1) => {
    const response = await fetch(
        `http://192.168.31.183:3000/users?page=${page}&limit=${limit}`
    );
    return response.json();
};

const UsersService = ({ children }) => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 1;
    const { isLoading, isError, status, error, data } = useQuery(
        ["users", page],
        () => getAllUsersFetch(page, itemsPerPage)
    );

    const usersCount = status === "success" ? data.totalUsers : 1;
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
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};

export default UsersService;
