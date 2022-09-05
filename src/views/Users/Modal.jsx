import React from "react";
import ReactModal from "react-modal";

const modalStyle = {
    overlay: {
        zIndex: "1000",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        position: "static",
        border: "none",
        width: "fit-content",
        height: "fit-content",
    },
};

const Modal = ({ modalOpen, setModalOpen, content }) => {
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
