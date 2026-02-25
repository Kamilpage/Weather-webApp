import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./drawer.module.css";

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    width?: string;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children, width = "380px" }) => {
    // Закрытие по ESC
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    if (typeof window === "undefined") return null;

    return ReactDOM.createPortal(
        <>
            <div
                className={`${styles.backdrop} ${isOpen ? styles.show : ""}`}
                onClick={onClose}
            />

            <div
                className={`${styles.drawer} ${isOpen ? styles.open : ""}`}
                style={{ width }}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </>,
        document.body
    );
};

export default Drawer;