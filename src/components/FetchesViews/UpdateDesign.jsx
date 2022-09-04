import React from "react";
import { useForm } from "react-hook-form";
import Form from "../Form/Form";

const fields = [
    {
        id: 1,
        type: "text",
        name: "designId",
        required: true,
        error: "please eneter design Id",
    },
];

const UpdateDesign = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <>
            <h2>update design</h2>
            <Form
                use={{ register, handleSubmit, errors, onSubmit }}
                fields={fields}
            />
        </>
    );
};

export default UpdateDesign;
