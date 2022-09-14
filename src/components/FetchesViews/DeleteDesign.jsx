import React, { useEffect } from "react";
import Form from "../Form/Form";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

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

const DeleteDesign = ({ design, setModal }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const DeleteDesignFetch = useMutation((id) => {
    return fetch(
      `http://${process.env.REACT_APP_NETWORKIP}:3000/designs/delete/${id}`,
      {
        method: "DELETE",
      }
    );
  });

  const onSubmit = async (data) => {
    if (data.name === design.name) {
      DeleteDesignFetch.mutate(design._id);
    } else {
      console.error("error in DeleteUser.jsx");
    }
  };

  useEffect(() => {
    DeleteDesignFetch.isSuccess && setModal(false);
    if (DeleteDesignFetch.isSuccess) {
      window.location.pathname = "/design";
    }
  });

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
        pattern={new RegExp(`^${design.name}$`, "i")}
      />
    </div>
  );
};

export default DeleteDesign;
