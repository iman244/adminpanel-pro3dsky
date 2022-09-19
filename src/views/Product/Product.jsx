import React, { useCallback, useState } from "react";
import "./product.css";
import "./product-form.css";
import { useParams } from "react-router-dom";
import MiniImage from "./MiniImage";
import ReactSimpleImageViewer from "react-simple-image-viewer";
import { useMutation, useQuery } from "react-query";
import { useEffect } from "react";
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
    `http://${process.env.REACT_APP_NETWORKIP}:3000/designs/${id}`,
    {
      credentials: "include",
    }
  );

  return response.json();
};

const getFile = async (id) => {
  const response = await fetch(
    `http://${process.env.REACT_APP_NETWORKIP}:3000/file/${id}`,
    { method: "GET", credentials: "include" }
  );

  return response.json();
};

function findIinSelectOptionsDesign(data) {
  if (data) {
    for (let i = 1; i < selectOptionsDesign.length; i++) {
      if (selectOptionsDesign[i].value === data.category) return i;
    }
  } else {
    console.log("there is no data");
  }
}

const Product = () => {
  let params = useParams();
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [i, setI] = useState();

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const design = useQuery(["design", i], () => getDesign(params.id), {
    onSuccess: (data) => {
      data.name && setValue("name", data.name);
      data.isPremium && setValue("isPremium", data.isPremium);
      setI(findIinSelectOptionsDesign(data));
    },
  });
  const file = useQuery("file", () => getFile(params.id), {});

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const updateDesignFetch = useMutation(
    async (data) => {
      return await fetch(
        `http://${process.env.REACT_APP_NETWORKIP}:3000/designs/update/${params.id}`,
        {
          credentials: "include",
          method: "PUT",
          mode: "cors",
          body: data,
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
          }, 1500);
        } else if (data.status === 409) {
          enqueueSnackbar(`name is in database`, {
            variant: "error",
            preventDuplicate: true,
          });
        } else if (data.status === 400) {
          enqueueSnackbar(`bad request`, {
            variant: "error",
            preventDuplicate: true,
          });
        }
      },
    }
  );

  const { data, isLoading, isFetching, isError, error } = design;
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

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
      if (name === "images" || name === "rarFile") {
        for (let i = 0; i < data[name].length; i++) {
          formData.append(name, data[name][i]);
        }
      } else if (name === "category") {
        formData.append(name, data[name]["value"]);
      } else {
        formData.append(name, data[name]);
      }
    }
    updateDesignFetch.mutate(formData);
  };

  useEffect(() => {});

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
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  {...field}
                  value={value}
                  defaultValue={() => {
                    return selectOptionsDesign[i];
                  }}
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
            height={"30%"}
            width={"20%"}
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
                    {
                      <img
                        className="image-index"
                        src={`https://${process.env.REACT_APP_BUCKETS3_NAME}.${process.env.REACT_APP_ENDPOINT_URL}/${data.keyList[0]}`}
                        alt="design"
                      />
                    }
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
                          value="update"
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
                          borderRadius: "3px",
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
            content={
              <DeleteDesign design={data} setModal={setModalOpenDelete} />
            }
          />
        </>
      )}
    </>
  );
};

export default Product;
