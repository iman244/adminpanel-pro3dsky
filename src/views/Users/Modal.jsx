import React from "react";
import ReactModal from "react-modal";

const Modal = ({
  modalOpen,
  setModalOpen,
  content,
  overlayStyle,
  contentStyle,
}) => {
  const modalStyle = {
    overlay: {
      ...overlayStyle,
      zIndex: "1000",
      backgroundColor: "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      ...contentStyle,
      position: "static",
      border: "none",
      width: "fit-content",
      height: "fit-content",
      overflow: "visible",
    },
  };
  return (
    <ReactModal
      style={modalStyle}
      isOpen={modalOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => setModalOpen(false)}
    >
      {content}
    </ReactModal>
  );
};

export default Modal;
