import React from "react";

const PageNotFound = () => {
  return (
    <>
      <div>PageNotFound you will redirect to home</div>
      {setTimeout(() => (window.location.pathname = "/"), 2000)}
    </>
  );
};

export default PageNotFound;
