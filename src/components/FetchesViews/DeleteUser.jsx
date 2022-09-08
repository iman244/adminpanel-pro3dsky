import React from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import Form from "../Form/Form";
import { useMutation } from "react-query";

const fields = [
    {
        id: 1,
        type: "text",
        name: "username",
        required: true,
        error: "you must enter exact username of user",
        pattern: true,
    },
];

const DeleteUser = ({ user }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const DeleteUserFetch = useMutation((id) => {
        return fetch(`http://127.0.0.1:3000/users/${id}`, { method: "DELETE" });
    });

    const onSubmit = (data) => {
        if (data.username === user.username) {
            DeleteUserFetch.mutate(user._id);
        } else {
            console.error("error in DeleteUser.jsx");
        }
    };

    return (
        <div className="fetch-container delete-user">
            <div className="headers">
                <h2>delete user</h2>
                <span>{user.username}</span>
            </div>

            <Form
                use={{ register, handleSubmit, errors, onSubmit }}
                submitButton="delete user"
                fields={fields}
                pattern={new RegExp(`^${user.username}$`, "i")}
            />
        </div>
    );
};

export default DeleteUser;
