import "./b-login.css";
import "./s-login.css";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "../../components/Form/Form";
import { useForm } from "react-hook-form";
import { LoginServiceContext } from "../../context/LoginService";

const FormFields = [
    {
        id: "username",
        type: "text",
        name: "username",
        required: true,
        error: "please enter username",
    },
    {
        id: "password",
        type: "password",
        name: "password",
        required: true,
        error: "please enter username",
    },
];

const Login = () => {
    const { setUser, setIsAllowed, LoginUserFetch, sec } =
        useContext(LoginServiceContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setUser(data);
        LoginUserFetch.mutate(data);
        if (document.cookie) {
            let access_token = document.cookie.match(
                /(?<=access_token=)[\s\S]+(?=;*)/
            )[0];
            sec.mutate({ access_token });
        }
    };

    useEffect(() => {
        if (sec.isSuccess) {
            setIsAllowed(sec.data.data);
        }
    });

    return (
        <div className="page page-login page-center">
            <Link to="/">
                <img
                    src="/LogoFinalCroped.png"
                    alt="pro3dskyLogo"
                    className="logo"
                />
            </Link>
            <div className="wrapper-form">
                <Form
                    use={{ register, handleSubmit, errors, onSubmit }}
                    fields={FormFields}
                />
            </div>
            {LoginUserFetch.isLoading && <span>Loading</span>}
            {LoginUserFetch.isError && <span>Error</span>}
            {LoginUserFetch.isSuccess && <span>success</span>}
            {sec.isLoading && <span>sec Loading</span>}
            {sec.isError && <span>sec Error</span>}
            {sec.isSuccess && (
                <span>{`sec success: ${JSON.stringify(sec.data.data)}`}</span>
            )}
        </div>
    );
};

export default Login;
