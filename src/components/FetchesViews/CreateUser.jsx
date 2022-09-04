import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import Form from "../Form/Form";
const axios = require("axios").default;

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
    {
        id: 3,
        type: "checkbox",
        name: "isAdmin",
        required: false,
        error: "",
        divClassName: "isAdmin",
    },
];

const CreateUser = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const createUserFetch = useMutation((data) => {
        return axios.post("http://127.0.0.1:3000/users/register", data, {
            withCredentials: true,
        });
    });
    const [credentials, setCredentials] = useState(null);

    const onSubmit = (data) => {
        setCredentials(data);
        createUserFetch.mutate(data);
    };

    useEffect(() => {
        console.log("front state: ", credentials);
    });

    return (
        <>
            <h2>create user</h2>
            <Form
                use={{ register, handleSubmit, errors, onSubmit }}
                fields={fields}
            />
            {createUserFetch.isLoading && <span>Loading</span>}
            {createUserFetch.isError && <span>Error</span>}
            {createUserFetch.isSuccess && <span>success</span>}
        </>
    );
};

export default CreateUser;
