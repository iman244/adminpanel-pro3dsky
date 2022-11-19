import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { AppContext } from "../../Services/AppService";
import { UsersContext } from "../../Services/UsersService";
import Form from "../Form/Form";
import { roleOptions } from "./roleOptions";
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
    type: "select",
    name: "role",
    required: true,
    options: roleOptions,
    error: "please select a role",
  },
];

const CreateUser = ({ setModal }) => {
  const { UserLog } = useContext(AppContext);
  const { setUsersChanged } = useContext(UsersContext);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const createUserFetch = useMutation(
    (data) => {
      console.log(data);
      return axios.post(
        `${process.env.REACT_APP_NETWORKIP}/users/register`,
        data,
        {
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: (data) => {
        if (data.status === 201 || data.statusCode === 201) {
          UserLog("success", "user created successfully");
          setUsersChanged((p) => p + 1);
          setModal(false);
        }
      },
    }
  );

  const onSubmit = (data) => {
    const { username, password, role } = data;

    const d = {
      username,
      password,
      role: role ? role.value : 100,
    };
    createUserFetch.mutate(d);
  };

  return (
    <div className="fetch-container create-user">
      <div className="headers">
        <h2>create user</h2>
      </div>
      <Form
        use={{ control, register, handleSubmit, errors, onSubmit }}
        submitButton="create user"
        isLoading={createUserFetch.isLoading}
        fields={fields}
      />
      {createUserFetch.isError && <span>Error</span>}
      {createUserFetch.isSuccess && <span>success</span>}
    </div>
  );
};

export default CreateUser;
