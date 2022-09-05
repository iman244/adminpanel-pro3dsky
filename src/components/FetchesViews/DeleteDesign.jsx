import React from "react";
import Form from "../Form/Form";
import { useForm } from "react-hook-form";

const fields = [
    {
        id: 1,
        type: "text",
        name: "designId",
        required: true,
        error: "please eneter design Id",
    },
];

const DeleteDesign = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <div className="fetch-container delete-design">
            <div className="headers">
                <h2>delete design</h2>
            </div>
            <Form
                use={{ register, handleSubmit, errors, onSubmit }}
                submitButton="delete design"
                fields={fields}
            />
        </div>
    );
};

export default DeleteDesign;
