import React from "react";

const LoaderSpinner = () => {
  return (
    <div className="d-flex justify-content-center center-loader">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoaderSpinner;