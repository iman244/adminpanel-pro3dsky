import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactLoading from "react-loading";

const ImageLoading = ({ src, alt, className, onClick }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {});
  return (
    <>
      <ReactLoading
        style={{ display: `${loading ? "block" : "none"}`, height: "220px" }}
        type={"blank"}
        color={"gray"}
        height={"fit-content"}
        width={"100%"}
      />

      <img
        style={{ display: `${loading ? "none" : "block"}` }}
        src={src}
        alt={alt}
        className={className}
        placeholder="/loading.jpeg"
        onClick={onClick}
        onLoad={() => {
          setLoading(false);
        }}
      />
    </>
  );
};

export default ImageLoading;
