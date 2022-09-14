import React from "react";
import ContentLoader from "react-content-loader";

const LoaderPaginate = () => {
  var w_bozorg = 80;
  var w = 320 - 80;
  var Tool = 35;
  var fasele = (w - 3 * Tool) / 4;
  return (
    <ContentLoader
      style={{ marginBottom: "1vh" }}
      width={270}
      viewBox="0 0 400 30"
    >
      {/* Only SVG shapes */}
      <rect x="0" y="0" width={`${w_bozorg}`} height="40" />
      <rect
        x={`${w_bozorg + 1 * fasele}`}
        y="0"
        width={`${Tool}`}
        height="40"
      />
      <rect
        x={`${w_bozorg + 2 * fasele + Tool}`}
        y="0"
        width={`${Tool}`}
        height="40"
      />
      <rect
        x={`${w_bozorg + 3 * fasele + 2 * Tool}`}
        y="0"
        width={`${Tool}`}
        height="40"
      />
      <rect
        x={`${w_bozorg + 4 * fasele + 3 * Tool}`}
        y="0"
        width={`${w_bozorg}`}
        height="40"
      />
    </ContentLoader>
  );
};

export default LoaderPaginate;
