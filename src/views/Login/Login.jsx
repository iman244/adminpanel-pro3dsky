import "./b-login.css";
import "./s-login.css";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "../../components/Form/Form";
import { useForm } from "react-hook-form";
import { LoginServiceContext } from "../../Services/LoginService";

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
  const { LoginUserFetch, sec } = useContext(LoginServiceContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    LoginUserFetch.mutate(data);
    if (document.cookie) {
      let access_token = document.cookie.match(
        /(?<=access_token=)[\s\S]+(?=;*)/
      )[0];
      sec.mutate({ access_token });
    }
  };

  useEffect(() => {});

  return (
    <div className="page page-login page-center">
      <Link to="/">
        <img src="/LogoFinalCroped.png" alt="pro3dskyLogo" className="logo" />
      </Link>
      <div className="wrapper-form">
        <div className="loginError">
          {LoginUserFetch.isError ? (
            <span>you are not authorized</span>
          ) : (
            sec.isSuccess &&
            sec.data.data === false && <span>you are not authorized</span>
          )}
        </div>
        <Form
          use={{ register, handleSubmit, errors, onSubmit }}
          fields={FormFields}
          isLoading={LoginUserFetch.isLoading || sec.isLoading}
          submitButton="login"
        />
      </div>
    </div>
  );
};

export default Login;
