import React from "react";
import { useForm } from "react-hook-form";
import Form from "./Form";
import "./form.css";

const fields = [
    {
        id: 1,
        type: "text",
        name: "username",
        required: true,
        error: "please enter username",
    },
    {
        id: 2,
        type: "password",
        name: "password",
        required: true,
        error: "minimum character is 6",
    },
];

const CreateUser = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <>
            <h2>create user</h2>
            <Form
                use={{ register, handleSubmit, errors, onSubmit }}
                fields={fields}
            />
        </>
    );
};

export default CreateUser;
