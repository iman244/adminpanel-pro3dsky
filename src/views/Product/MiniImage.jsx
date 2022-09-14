import React from "react";
import "./miniImage.css";

const MiniImage = ({ image, index, openImageViewer }) => {
  return (
    <div className="miniImage">
      <img src={image} alt="designs" className="miniImage" />
      <div
        className="miniImage showHide"
        onClick={() => openImageViewer(index)}
      >
        <i className="fa-solid fa-magnifying-glass-plus miniImage"></i>
      </div>
    </div>
  );
};

export default MiniImage;
