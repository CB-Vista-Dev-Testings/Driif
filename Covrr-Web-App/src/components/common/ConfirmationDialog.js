import React from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ConfirmationDialog = ({ visible, onHide, onAccept, title, message, acceptLabel = "Yes", rejectLabel = "No", data }) => {
  return (
    <>
      <ConfirmDialog
        group="headless"
        visible={visible}
        onHide={onHide}
        content={({ headerRef, contentRef, footerRef, hide }) => (
          <div className="flex flex-col items-center p-5 px-8 bg-cardBackground border border-border rounded-xl">
            <div className="bg-primary inline-flex justify-center items-center h-20 w-20 -mt-12 rounded-full">
              <ExclamationTriangleIcon className="size-10 text-themeWhite" />
            </div>
            <span className="font-bold text-2xl block mb-2 mt-4 text-text2" ref={headerRef}>
              {title}
            </span>
            <p className="mb-0 text-text4" ref={contentRef}>
              {message}
            </p>
            <div className="flex items-center gap-2 mt-4" ref={footerRef}>
              <button className="btn btn-white btn-lg" onClick={onHide}>
                {rejectLabel}
              </button>
              <button
                className="btn btn-primary btn-lg"
                onClick={(event) => {
                  hide(event);
                  onAccept(data);
                }}
              >
                {acceptLabel}
              </button>
            </div>
          </div>
        )}
      />
    </>
  );
};

export default ConfirmationDialog;
