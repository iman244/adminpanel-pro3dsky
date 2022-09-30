import React, { useCallback, useState } from "react";
import "./product.css";
import "./product-form.css";
import { useParams } from "react-router-dom";
import MiniImage from "./MiniImage";
import ReactSimpleImageViewer from "react-simple-image-viewer";
import { useMutation, useQuery } from "react-query";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { selectOptionsDesign } from "../../components/Form/selectOptionsDesign";
import ReactLoading from "react-loading";
import { useSnackbar } from "notistack";
import PageNotFound from "../404/PageNotFound";
import Error403 from "../../components/Error403/Error403";
import Modal from "../Users/Modal";
import DeleteDesign from "../../components/FetchesViews/DeleteDesign";
import DownloadButton from "../../components/Buttons/DownloadButton";
import { useContext } from "react";
import { AppContext } from "../../Services/AppService";
import ImageLoading from "../../components/ImageLoading";
import axios from "axios";

const fields = [
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
    accept: "image/png, image/jpeg",
    required: false,
    error: "please upload your design",
    multiple: true,
  },
  {
    id: 5,
    type: "file",
    name: "rarFile",
    accept: ".rar",
    required: false,
    error: "please upload your design",
    multiple: false,
  },
];

const selectStyle = {
  option: (styles) => ({ ...styles, textTransform: "capitalize" }),
  control: (styles) => ({
    ...styles,
    padding: "0.1rem 0rem",
    borderColor: "#d0d0d0",
    textTransform: "capitalize",
  }),
};

const getDesign = async (id) => {
  const response = await fetch(
    `http://${process.env.REACT_APP_NETWORKIP}/designs/${id}`,
    {
      credentials: "include",
    }
  );

  return response.json();
};

const getFile = async (id) => {
  const response = await fetch(
    `http://${process.env.REACT_APP_NETWORKIP}/file/${id}`,
    { method: "GET", credentials: "include" }
  );

  return response.json();
};

function findIinSelectOptionsDesign(data) {
  if (data) {
    for (let i = 0; i < selectOptionsDesign.length; i++) {
      if (selectOptionsDesign[i].value === data.category) return i;
    }
  } else {
    console.log("there is no data");
  }
}

const Product = () => {
  let params = useParams();
  const { UserLog } = useContext(AppContext);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [productUpdated, setProductUpdated] = useState(1);
  const [uploadProgress, setUploadProgress] = useState("please wait");
  const [i, setI] = useState();

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const design = useQuery(
    ["design", params.id, productUpdated],
    () => getDesign(params.id),
    {
      onSuccess: (data) => {
        data.name && setValue("name", data.name);
        data.isPremium && setValue("isPremium", data.isPremium);
        setI(findIinSelectOptionsDesign(data));
      },
    }
  );
  const { data, isLoading, isError, error } = design;
  const file = useQuery("file", () => getFile(params.id), {});

  const { enqueueSnackbar } = useSnackbar();
  const updateDesignFetch = useMutation(
    async (data) => {
      const response = await fetch(
        `http://${process.env.REACT_APP_NETWORKIP}/designs/update/${params.id}`,
        {
          method: "PUT",
          credentials: "include",
          body: data,
        }
      );
      return response.json();
    },
    {
      onSuccess: async (data) => {
        if (
          data.status === 200 ||
          data.statusCode === 201 ||
          data.PresignedPost
        ) {
          if (getValues("rarFile")[0]) {
            enqueueSnackbar(
              "upload start. please don't refresh page till success",
              {
                variant: "info",
                preventDuplicate: true,
              }
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
              UserLog("success", "design update successfully");
            } catch (error) {
              enqueueSnackbar(`${error.message}`, {
                variant: "error",
                preventDuplicate: true,
              });
            }
          } else {
            UserLog("success", "design update successfully");
          }

          setProductUpdated((p) => p + 1);
          if (getValues("images")[0]) {
            setTimeout(() => window.location.reload(), 1000);
          }
        } else if (data.status === 409 || data.statusCode === 409) {
          UserLog("error", "name is in database");
        } else if (data.status === 400 || data.statusCode === 400) {
          UserLog("error", "bad request");
        }
      },
    }
  );

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const onSubmit = (data) => {
    if (!data.category) {
      data.category =
        selectOptionsDesign[findIinSelectOptionsDesign(design.data)];
    }
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
    updateDesignFetch.mutate(formData);
  };

  const input = (field) => {
    switch (field.type) {
      default:
        return (
          <input
            type={field.type}
            name={field.name}
            {...register(field.name, {
              required: field.required,
            })}
            placeholder=" "
          />
        );
      case "file":
        return (
          <input
            type={field.type}
            name={field.name}
            {...register(field.name, {
              required: field.required,
            })}
            accept={field.accept}
            placeholder=" "
            multiple={field.multiple}
          />
        );
      case "select":
        const defaultValue = selectOptionsDesign[i];
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  {...field}
                  value={value}
                  defaultValue={defaultValue}
                  onChange={onChange}
                  placeholder="Categories"
                  options={selectOptionsDesign}
                  styles={selectStyle}
                />
              );
            }}
          />
        );
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <ReactLoading
            type={"bars"}
            color={"gray"}
            height={"fit-content"}
            width={"200px"}
          />
        </div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : data.statusCode === 400 || data.statusCode === 404 ? (
        <PageNotFound />
      ) : data.statusCode === 403 ? (
        <Error403 />
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="page product">
              <div className="product container">
                <div className="imagePdescDownload">
                  <div className="image">
                    <ImageLoading
                      height="100%"
                      className="image-index"
                      src={`https://${process.env.REACT_APP_BUCKETS3_NAME}.${process.env.REACT_APP_ENDPOINT_URL}/${data.keyList[0]}`}
                      alt="design"
                    />
                  </div>
                  <div className="descAndDownload">
                    <div className="d-wrapper">
                      <span className="d-label" title="Name">
                        name:
                      </span>
                      <span className="d" title={design.data.name}>
                        {design.data.name}
                      </span>
                    </div>
                    {fields.map((field) => (
                      <div
                        className={
                          field.divClassName
                            ? `wrapper-input ${field.divClassName}`
                            : "wrapper-input"
                        }
                        key={field.id}
                      >
                        {input(field, i)}
                        {field.type !== "select" && (
                          <label htmlFor={field.name}>{field.name}</label>
                        )}
                        {errors[field.name] && (
                          <span className="error">{field.error}</span>
                        )}
                      </div>
                    ))}

                    <div className="updatePage-buttons">
                      <div className="submit">
                        <input
                          type="submit"
                          value={
                            updateDesignFetch.isLoading
                              ? uploadProgress
                              : "update"
                          }
                          className="submit"
                        />
                        <button
                          type="button"
                          className="delete"
                          onClick={() => setModalOpenDelete(true)}
                        >
                          delete
                        </button>
                      </div>
                      <DownloadButton
                        buttonStyle={{
                          padding: "10px 20px",
                        }}
                        downloadLink={
                          file.isSuccess ? file.data.preSignedURL : "#"
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="hr"></div>
                <div className="listOfImages">
                  {data.keyList.map((name, index) => (
                    <MiniImage
                      key={name}
                      image={`https://${process.env.REACT_APP_BUCKETS3_NAME}.${process.env.REACT_APP_ENDPOINT_URL}/${name}`}
                      index={index}
                      openImageViewer={openImageViewer}
                    />
                  ))}
                </div>
              </div>
              {isViewerOpen && (
                <ReactSimpleImageViewer
                  src={data.keyList.map(
                    (name) =>
                      `https://${process.env.REACT_APP_BUCKETS3_NAME}.${process.env.REACT_APP_ENDPOINT_URL}/${name}`
                  )}
                  currentIndex={currentImage}
                  onClose={closeImageViewer}
                  disableScroll={false}
                  backgroundStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    zIndex: "5000",
                  }}
                  closeOnClickOutside={true}
                />
              )}
            </div>
          </form>
          <Modal
            modalOpen={modalOpenDelete}
            setModalOpen={setModalOpenDelete}
            content={<DeleteDesign design={data} />}
          />
        </>
      )}
    </>
  );
};

export default Product;
