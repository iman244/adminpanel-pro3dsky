import axios from "axios";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { AppContext } from "../../Services/AppService";
import { UsersContext } from "../../Services/UsersService";
import Form from "../Form/Form";

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
    type: "checkbox",
    name: "isAdmin",
    required: false,
    error: "",
    divClassName: "isAdmin",
  },
];

const UpdateUser = ({ user, setModal }) => {
  const { UserLog } = useContext(AppContext);
  const { setUsersChanged } = useContext(UsersContext);
  const {
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
    UpdateUserFetch.mutate(data);
  };

  useEffect(() => {
    setValue("username", user.username);
    setValue("password", user.password);
    setValue("isAdmin", user.isAdmin);
  }, []);

  return (
    <div className="fetch-container update-user">
      <div className="headers">
        <h2>update user</h2>
        <span>{user.username}</span>
      </div>
      <Form
        use={{ register, handleSubmit, errors, onSubmit }}
        isLoading={UpdateUserFetch.isLoading}
        submitButton="update user"
        fields={fields}
      />
    </div>
  );
};

export default UpdateUser;
