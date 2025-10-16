import React from 'react';

const Loading = ({ message = "Loading...", size = "large" }) => {
  const spinnerSize = size === "small" ? "2rem" : size === "medium" ? "3rem" : "4rem";
  
  return (
    <div className="loading-container text-center py-5">
      <div 
        className="spinner-border loading-spinner" 
        role="status"
        style={{ width: spinnerSize, height: spinnerSize }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="loading-text mt-3 mb-0">{message}</p>
    </div>
  );
};

export default Loading;