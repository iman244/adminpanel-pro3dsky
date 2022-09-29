import React from "react";
import { Link } from "react-router-dom";
import "./downloadButton.css";

const DownloadButton = ({ buttonStyle, to, downloadLink }) => {
  if (downloadLink) {
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
  }
  if (to) {
    return (
      <Link className="download" style={buttonStyle} to={to}>
        <span className="download">download</span>
        <i className="fa fa-download download"></i>
      </Link>
    );
  }
};

export default DownloadButton;
