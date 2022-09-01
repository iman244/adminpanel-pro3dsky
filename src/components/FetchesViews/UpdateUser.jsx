import React from "react";
import { useForm } from "react-hook-form";
import Form from "./Form";

const fields = [
    {
        id: 1,
        type: "text",
        name: "userId",
        required: true,
        error: "please eneter user Id",
    },
];

const UpdateUser = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <>
            <h2>update user</h2>
            <Form
                use={{ register, handleSubmit, errors, onSubmit }}
                fields={fields}
            />
        </>
    );
};

export default UpdateUser;
