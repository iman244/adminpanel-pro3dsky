import React from "react";
import { useForm } from "react-hook-form";
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
        type: "password",
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

const UpdateUser = ({ username }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <div className="fetch-container update-user">
            <div className="headers">
                <h2>update user</h2>
                <span>{username}</span>
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
