import React from "react";
import Form from "../Form/Form";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useContext } from "react";
import { AppContext } from "../../Services/AppService";
import { useNavigate } from "react-router-dom";

const fields = [
  {
    id: 1,
    type: "text",
    name: "name",
    required: true,
    error: "you must enter exact username of user",
    pattern: true,
  },
];

const DeleteDesign = ({ design }) => {
  const { UserLog } = useContext(AppContext);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const DeleteDesignFetch = useMutation(
    async (id) => {
      const url = `${process.env.REACT_APP_NETWORKIP}/designs/delete/${id}`;
      return await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
    },
    {
      onSuccess: (data) => {
        if (data.status === 200 || data.statusCode === 200) {
          UserLog("success", "success");
          navigate("/design");
        }
      },
    }
  );

  const onSubmit = async (data) => {
    if (data.name === design.name) {
      DeleteDesignFetch.mutate(design._id);
    } else {
      console.error("error in DeleteUser.jsx");
    }
  };

  return (
    <div className="fetch-container delete-design">
      <div className="headers">
        <h2>delete design</h2>
        <span>{design.name}</span>
      </div>
      <Form
        use={{ register, handleSubmit, errors, onSubmit }}
        submitButton="delete design"
        fields={fields}
        isLoading={DeleteDesignFetch.isLoading}
        pattern={new RegExp(`^${design.name}$`)}
      />
    </div>
  );
};

export default DeleteDesign;
