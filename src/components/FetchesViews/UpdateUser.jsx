import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Form from "../Form/Form";

const fields = [
    {
        id: 1,
        type: "text",
        name: "username",
        required: true,
        error: "please enter new username",
    },
    {
        id: 2,
        type: "text",
        name: "password",
        required: true,
        error: "please enter new password",
    },
    {
        id: 3,
        type: "checkbox",
        name: "isAdmin",
        required: false,
        error: "",
        divClassName: "isAdmin",
    },
];

const UpdateUser = ({ user }) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    const UpdateUserFetch = useMutation((data) => {
        console.log("run", `http://127.0.0.1:3000/users/${user._id}`);
        return axios.put(`http://127.0.0.1:3000/users/${user._id}`, data, {
            withCredentials: true,
        });
    });

    const onSubmit = (data) => {
        console.log(data);
        UpdateUserFetch.mutate(data);
    };

    useEffect(() => {
        setValue("username", user.username);
        setValue("password", user.password);
        setValue("isAdmin", user.isAdmin);
    });

    return (
        <div className="fetch-container update-user">
            <div className="headers">
                <h2>update user</h2>
                <span>{user.username}</span>
            </div>
            <Form
                use={{ register, handleSubmit, errors, onSubmit }}
                submitButton="update user"
                fields={fields}
            />
        </div>
    );
};

export default UpdateUser;
