import React, { useEffect } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import Form from "../Form/Form";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";

const fields = [
  {
    id: 1,
    type: "text",
    name: "username",
    required: true,
    error: "you must enter exact username of user",
    pattern: true,
  },
];

const DeleteUser = ({ user, setModal }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const DeleteUserFetch = useMutation(
    (id) => {
      return fetch(
        `http://${process.env.REACT_APP_NETWORKIP}:3000/users/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
    },
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          enqueueSnackbar("success", {
            variant: "success",
            preventDuplicate: true,
          });
          setTimeout(function () {
            window.location.reload();
          }, 3000);
        }
      },
    }
  );

  const onSubmit = async (data) => {
    if (data.username === user.username) {
      DeleteUserFetch.mutate(user._id);
    } else {
      console.error("error in DeleteUser.jsx");
    }
  };

  useEffect(() => {});

  return (
    <div className="fetch-container delete-user">
      <div className="headers">
        <h2>delete user</h2>
        <span>{user.username}</span>
      </div>

      <Form
        use={{ register, handleSubmit, errors, onSubmit }}
        submitButton="delete user"
        fields={fields}
        isLoading={DeleteUserFetch.isLoading}
        pattern={new RegExp(`^${user.username}$`, "i")}
      />
    </div>
  );
};

export default DeleteUser;
