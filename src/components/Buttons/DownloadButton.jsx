import React from "react";
import "./downloadButton.css";

const DownloadButton = ({ buttonStyle }) => {
    return (
        <button className="download" style={buttonStyle}>
            <span className="download">download</span>
            <i className="fa fa-download download"></i>
        </button>
    );
};

export default DownloadButton;
