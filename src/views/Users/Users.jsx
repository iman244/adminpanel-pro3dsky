import React, { useEffect } from "react";
import { useQuery } from "react-query";
import "./users.css";

const getAllUsersFetch = async () => {
    const response = await fetch("http://127.0.0.1:3000/users");
    return response.json();
};

const Users = () => {
    const { data, status } = useQuery("users", getAllUsersFetch);
    useEffect(() => {});
    return (
        <div className="users-grid">
            {status === "success" &&
                data.map((user) => (
                    <div key={user.username}>{user.username}</div>
                ))}
        </div>
    );
};

export default Users;
