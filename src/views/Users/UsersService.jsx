import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

export const UsersContext = createContext();

const getAllUsersFetch = async (keyword="",page = 1, limit = 1) => {
    const response = await fetch(
        `http://127.0.0.1:3000/users?keyword=${keyword}&page=${page}&limit=${limit}`
    );
    return response.json();
};

const SearchUsersFetch = async (keyword="", page = 1, limit = 1) => {
    const response = await fetch(
        `http://127.0.0.1:3000/users/search?page=${page}&limit=${limit}`
    );
    return response.json();
};

const UsersService = ({ children }) => {
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState('')
    const itemsPerPage = 1;
    const { isLoading, isError, status, error, data } = useQuery(
        ["users", page, keyword],
        () => getAllUsersFetch(keyword,page, itemsPerPage)
    );

    // const { isLoading, isError, status, error, data } = useQuery(
    //     ["usersSearch", page],
    //     () => SearchUsersFetch(keyword,page, itemsPerPage)
    // )

    const usersCount = status === "success" ? data.totalUsers : 1;

    useEffect(()=> {
        console.log(keyword)
    })

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
                setKeyword
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};

export default UsersService;
