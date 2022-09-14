import React from "react";
import "./basicButton.css";

const BasicButton = ({ buttonStyle, span }) => {
  return (
    <button className="basic-btn" style={buttonStyle}>
      <span className="basic-btn">{span}</span>
    </button>
  );
};

export default BasicButton;
