import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Modal from "./Modal";
import CreateUser from "../../components/FetchesViews/CreateUser";
import UserCard from "./UserCard/UserCard";
import "./users.css";

const getAllUsersFetch = async () => {
    const response = await fetch("http://127.0.0.1:3000/users");
    return response.json();
};

const Users = () => {
    const [modalOpenCreate, setModalOpenCreate] = useState(false);
    const { data, status } = useQuery("users", getAllUsersFetch);
    useEffect(() => {});
    return (
        <div className="users-container">
            <div className="headers">
                <h2>users list</h2>
                <button
                    className="create-user"
                    onClick={() => setModalOpenCreate(true)}
                >
                    <i className="fa-solid fa-plus"></i>
                    <span>create new user</span>
                </button>
            </div>
            <div className="users-grid">
                {status === "success" &&
                    data.map((user) => (
                        <UserCard key={user.username} user={user} />
                    ))}

                <Modal
                    modalOpen={modalOpenCreate}
                    setModalOpen={setModalOpenCreate}
                    content={<CreateUser />}
                />
            </div>
        </div>
    );
};

export default Users;
