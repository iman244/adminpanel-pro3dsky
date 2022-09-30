import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { AppContext } from "../../Services/AppService";
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
    defaultValue: true,
  },
  {
    id: 4,
    type: "file",
    name: "images",
    accept: "image/png, image/jpeg",
    required: true,
    error: "please upload your design",
    multiple: true,
  },
  {
    id: 5,
    type: "file",
    name: "rarFile",
    accept: ".rar",
    required: true,
    error: "please upload your rar file",
    multiple: false,
  },
];

const UploadDesign = () => {
  const { UserLog } = useContext(AppContext);
  const [uploadProgress, setUploadProgress] = useState("please wait");
  const {
    control,
    register,
    handleSubmit,
    getValues,

    formState: { errors },
  } = useForm();

  const uploadDesignFetch = useMutation(
    async (data) => {
      const response = await fetch(
        `http://${process.env.REACT_APP_NETWORKIP}/designs/upload`,
        {
          method: "POST",
          credentials: "include",
          body: data,
        }
      );
      return response.json();
    },
    {
      onSuccess: async (data) => {
        if (
          data.status === 201 ||
          data.statusCode === 201 ||
          data.PresignedPost
        ) {
          UserLog(
            "info",
            "upload start. please don't refresh page till success"
          );

          const { url, fields } = data.PresignedPost;

          const form = new FormData();
          Object.entries(fields).forEach(([field, value]) => {
            form.append(field, value);
          });
          form.append("file", getValues("rarFile")[0]);

          let urlpure = url.match(/(?<=https:\/\/)[\s\S]*/)[0];

          try {
            await axios.post(`https://${fields.bucket}.${urlpure}`, form, {
              headers: { "Content-Type": "multipart/form-data" },
              onUploadProgress: function (progressEvent) {
                setUploadProgress(
                  `${Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                  )}%`
                );
              },
            });
            setUploadProgress("please wait");
            UserLog("success", "design uploaded successfully");
          } catch (error) {
            UserLog("error", `${error.message}`);
            UserLog(
              "warning",
              "document was created, but upload was unsuccessful! please upload your rar in design page",
              10000
            );
          }
        } else if (data.status === 409 || data.statusCode === 409) {
          UserLog("error", "name is in database");
        } else if (data.status === 403 || data.statusCode === 403) {
          UserLog("error", "Your session is expired! please login again");
        }
      },
      onError: (error) => {
        console.log(error);
        UserLog("error", `${error.message}`);
      },
    }
  );

  const onSubmit = (data) => {
    try {
      let formData = new FormData();
      for (const name in data) {
        if (name === "images") {
          for (let i = 0; i < data[name].length; i++) {
            formData.append(name, data[name][i]);
          }
        } else if (name === "category") {
          formData.append(name, data[name]["value"]);
        } else if (name !== "rarFile") {
          formData.append(name, data[name]);
        }
      }
      uploadDesignFetch.mutate(formData);
    } catch (error) {
      console.dir(error);
      UserLog("error", "please select a category");
    }
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
        LoadingTXT={uploadProgress}
        fields={fields}
      />
    </div>
  );
};

export default UploadDesign;
