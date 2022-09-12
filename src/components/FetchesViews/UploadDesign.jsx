import axios from "axios";
import { useSnackbar } from "notistack";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Form from "../Form/Form";

const fields = [
  {
    id: 1,
    type: "text",
    name: "name",
    required: true,
    error: "please eneter a name for new design",
  },
  {
    id: 2,
    type: "select",
    name: "category",
    required: true,
    error: "please select a category",
  },
  {
    id: 3,
    type: "checkbox",
    name: "isPremium",
    required: false,
    error: "",
    divClassName: "isAdmin",
  },
  {
    id: 4,
    type: "file",
    name: "images",
    required: true,
    error: "please upload your design",
    multiple: true,
  },
];

const UploadDesign = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const uploadDesignFetch = useMutation(
    async (data) => {
      return await fetch(
        `http://${process.env.REACT_APP_NETWORKIP}:3000/designs/upload`,
        {
          credentials: "include",
          method: "POST",
          mode: "cors",
          body: data,
        }
      );
    },
    {
      onSuccess: (data) => {
        if (data.status === 201) {
          enqueueSnackbar("success", {
            variant: "success",
            preventDuplicate: true,
          });
        } else if (data.status === 409) {
          enqueueSnackbar(`name is in database`, {
            variant: "error",
            preventDuplicate: true,
          });
        }
      },
    }
  );

  const onSubmit = (data) => {
    let formData = new FormData();
    for (const name in data) {
      if (name === "images") {
        for (let i = 0; i < data[name].length; i++) {
          formData.append(`images`, data[name][i]);
        }
      } else if (name === "category") {
        formData.append(name, data[name]["value"]);
      } else {
        formData.append(name, data[name]);
      }
    }
    uploadDesignFetch.mutate(formData);
  };

  useEffect(() => {});

  return (
    <div className="fetch-container upload-design">
      <div className="headers">
        <h2>upload new design</h2>
      </div>
      <Form
        use={{ control, register, handleSubmit, errors, onSubmit }}
        submitButton="upload"
        isLoading={uploadDesignFetch.isLoading}
        fields={fields}
      />
    </div>
  );
};

export default UploadDesign;
