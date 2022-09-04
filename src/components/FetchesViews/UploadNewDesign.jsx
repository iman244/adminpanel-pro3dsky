import React from "react";
import { useForm } from "react-hook-form";
import Form from "../Form/Form";

const fields = [
    {
        id: 1,
        type: "text",
        name: "name",
        required: true,
        error: "please eneter a name for new design",
    },
    {
        id: 2,
        type: "select",
        name: "category",
        required: true,
        error: "please select a category",
    },
    {
        id: 3,
        type: "file",
        name: "images",
        required: true,
        error: "please upload your design",
        multiple: true,
    },
];

const UploadNewDesign = () => {
    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <>
            <h2>upload design</h2>
            <Form
                use={{ control, register, handleSubmit, errors, onSubmit }}
                fields={fields}
            />
        </>
    );
};

export default UploadNewDesign;
