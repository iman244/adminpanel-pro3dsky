import React from "react";
import "./downloadButton.css";

const DownloadButton = ({ buttonStyle, downloadLink }) => {
  return (
    <a
      className="download"
      style={buttonStyle}
      href={downloadLink}
      target="_blank"
    >
      <span className="download">download</span>
      <i className="fa fa-download download"></i>
    </a>
  );
};

export default DownloadButton;
