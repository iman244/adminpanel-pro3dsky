import React from "react";
import { useForm } from "react-hook-form";
import Form from "../Form/Form";

const fields = [
    {
        id: 1,
        type: "text",
        name: "username",
        required: true,
        error: "please enter username",
    },
];

const DeleteUser = ({ username }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <div className="fetch-container delete-user">
            <div className="headers">
                <h2>delete user</h2>
                <span>{username}</span>
            </div>
            <Form
                use={{ register, handleSubmit, errors, onSubmit }}
                submitButton="delete user"
                fields={fields}
            />
        </div>
    );
};

export default DeleteUser;
