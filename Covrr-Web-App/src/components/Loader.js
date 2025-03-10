import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Loader = ({ fullscreen = false, className = "" }) => {
  useEffect(() => {
    if (fullscreen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [fullscreen]);

  return (
    <>
      {fullscreen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader-modern">
            <div className="loader-dot loader-dot1"></div>
            <div className="loader-dot loader-dot2"></div>
            <div className="loader-dot loader-dot3"></div>
          </div>
        </div>
      ) : (
        <div className={`loader-container ${className}`}>
          <div className="loader-modern">
            <div className="loader-dot loader-dot1"></div>
            <div className="loader-dot loader-dot2"></div>
            <div className="loader-dot loader-dot3"></div>
          </div>
        </div>
      )}
    </>
  );
};

Loader.propTypes = {
  fullscreen: PropTypes.bool,
  className: PropTypes.string,
};

export default Loader;
