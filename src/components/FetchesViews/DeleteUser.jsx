import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Form from "../Form/Form";
import { useMutation } from "react-query";
import { AppContext } from "../../Services/AppService";
import { UsersContext } from "../../Services/UsersService";

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
  const { UserLog } = useContext(AppContext);
  const { setUsersChanged } = useContext(UsersContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const DeleteUserFetch = useMutation(
    async (id) => {
      return await fetch(`${process.env.REACT_APP_NETWORKIP}/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
    },
    {
      onSuccess: (data) => {
        if (data.status === 200 || data.statusCode === 200) {
          UserLog("success", "user deleted successfully");
          setUsersChanged((p) => p + 1);
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
