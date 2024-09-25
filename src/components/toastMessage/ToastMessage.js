import { createRoot } from "react-dom/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./toastMessage.css";

library.add(fas);

const renderToast = (toast, rootToast, duration = 4000) => {
    const toastContainer = document.createElement("div");
    rootToast.appendChild(toastContainer);
    const toastRoot = createRoot(toastContainer);

    toastRoot.render(toast);

    setTimeout(() => {
        toastRoot.unmount();
        rootToast.removeChild(toastContainer);
    }, duration);
};

export const toastError = (title, message) => {
    const rootToast = document.getElementById("toast-root");
    if (rootToast) {
        const toast = (
            <div className="toast__message toast__error">
                <div className="toast__icon">
                    <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
                </div>
                <div className="toast__body">
                    <h3 className="toast__title">{title}</h3>
                    <p className="toast__msg">{message}</p>
                </div>
                <div className="toast__close">
                    <FontAwesomeIcon icon="fa-solid fa-xmark" />
                </div>
            </div>
        );
        renderToast(toast, rootToast);
    }
};

export const toastSuccess = (title, message) => {
    const rootToast = document.getElementById("toast-root");
    if (rootToast) {
        const toast = (
            <div className="toast__message toast__success">
                <div className="toast__icon">
                    <FontAwesomeIcon icon="fa-solid fa-circle-check" />
                </div>
                <div className="toast__body">
                    <h3 className="toast__title">{title}</h3>
                    <p className="toast__msg">{message}</p>
                </div>
                <div className="toast__close">
                    <FontAwesomeIcon icon="fa-solid fa-xmark" />
                </div>
            </div>
        );
        renderToast(toast, rootToast);
    }
};

export const toastWarning = (title, message) => {
    const rootToast = document.getElementById("toast-root");
    if (rootToast) {
        const toast = (
            <div className="toast__message toast__warning">
                <div className="toast__icon">
                    <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />
                </div>
                <div className="toast__body">
                    <h3 className="toast__title">{title}</h3>
                    <p className="toast__msg">{message}</p>
                </div>
                <div className="toast__close">
                    <FontAwesomeIcon icon="fa-solid fa-xmark" />
                </div>
            </div>
        );
        renderToast(toast, rootToast);
    }
};

export const toastInfo = (title, message) => {
    const rootToast = document.getElementById("toast-root");
    if (rootToast) {
        const toast = (
            <div className="toast__message toast__info">
                <div className="toast__icon">
                    <FontAwesomeIcon icon="fa-solid fa-info" />
                </div>
                <div className="toast__body">
                    <h3 className="toast__title">{title}</h3>
                    <p className="toast__msg">{message}</p>
                </div>
                <div className="toast__close">
                    <FontAwesomeIcon icon="fa-solid fa-xmark" />
                </div>
            </div>
        );
        renderToast(toast, rootToast);
    }
};

// Optional: default ToastMessage Component
const ToastMessage = () => (
    <div id="toast-root"></div>
);

export default ToastMessage;
