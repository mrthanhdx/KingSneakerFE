import { createRoot } from "react-dom/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./toastMessage.css";
import React from "react";

library.add(fas);

const renderToast = (toast, rootToast, duration = 4000) => {
    const toastContainer = document.createElement("div");
    rootToast.appendChild(toastContainer);
    const toastRoot = createRoot(toastContainer);

    const closeToast = () => {
        clearTimeout(timeoutId)
        toastRoot.unmount();
        rootToast.removeChild(toastContainer);
    };

    toastRoot.render(
        React.cloneElement(toast, { onClose: closeToast })
    );

   const timeoutId = setTimeout(closeToast, duration);
};

const ToastMessage = ({ type, title, message, onClose }) => (
    <div className={`toast__message toast__${type}`}>
        <div className="toast__icon">
            {type === "error" && <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />}
            {type === "success" && <FontAwesomeIcon icon="fa-solid fa-circle-check" />}
            {type === "warning" && <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />}
            {type === "info" && <FontAwesomeIcon icon="fa-solid fa-info" />}
        </div>
        <div className="toast__body">
            <h3 className="toast__title">{title}</h3>
            <p className="toast__msg">{message}</p>
        </div>
        <div className="toast__close" onClick={onClose}>
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </div>
    </div>
);

export const toastError = (title, message) => {
    const rootToast = document.getElementById("toast-root");
    if (rootToast) {
        const toast = <ToastMessage type="error" title={title} message={message} />;
        renderToast(toast, rootToast);
    }
};

export const toastSuccess = (title, message) => {
    const rootToast = document.getElementById("toast-root");
    if (rootToast) {
        const toast = <ToastMessage type="success" title={title} message={message} />;
        renderToast(toast, rootToast);
    }
};

export const toastWarning = (title, message) => {
    const rootToast = document.getElementById("toast-root");
    if (rootToast) {
        const toast = <ToastMessage type="warning" title={title} message={message} />;
        renderToast(toast, rootToast);
    }
};

export const toastInfo = (title, message) => {
    const rootToast = document.getElementById("toast-root");
    if (rootToast) {
        const toast = <ToastMessage type="info" title={title} message={message} />;
        renderToast(toast, rootToast);
    }
};

export const ToastContainer = () => (
    <div id="toast-root"></div>
);

export default ToastMessage;
