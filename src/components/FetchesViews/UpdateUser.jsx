import axios from "axios";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { AppContext } from "../../Services/AppService";
import { UsersContext } from "../../Services/UsersService";
import Form from "../Form/Form";
import { roleOptions } from "./roleOptions";

const fields = [
  {
    id: 1,
    type: "text",
    name: "username",
    required: true,
    error: "please enter new username",
  },
  {
    id: 2,
    type: "text",
    name: "password",
    required: true,
    error: "please enter new password",
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

const UpdateUser = ({ user, setModal }) => {
  const { UserLog } = useContext(AppContext);
  const { setUsersChanged } = useContext(UsersContext);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const UpdateUserFetch = useMutation(
    (data) => {
      return axios.put(
        `${process.env.REACT_APP_NETWORKIP}/users/${user._id}`,
        data,
        {
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: (data) => {
        if (data.status === 200 || data.statusCode === 200) {
          UserLog("success", "user updated successfully");
          setUsersChanged((p) => p + 1);
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
    UpdateUserFetch.mutate(d);
  };

  useEffect(() => {
    setValue("username", user.username);
    setValue("password", user.password);
    setValue("role", user.role);
  }, []);

  return (
    <div className="fetch-container update-user">
      <div className="headers">
        <h2>update user</h2>
        <span>{user.username}</span>
      </div>
      <Form
        use={{ control, register, handleSubmit, errors, onSubmit }}
        isLoading={UpdateUserFetch.isLoading}
        submitButton="update user"
        fields={fields}
      />
    </div>
  );
};

export default UpdateUser;
