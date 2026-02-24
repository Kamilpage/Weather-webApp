import {useEffect, useCallback, useRef, useState} from "react";
import {createPortal} from "react-dom";
import styles from "./modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
    const [mounted, setMounted] = useState(false); // есть ли узел в DOM
    const [active, setActive] = useState(false);   // есть ли класс .show
    const overlayRef = useRef(null);

    const handleEscape = useCallback((e) => {
        if (e.key === "Escape") onClose();
    }, [onClose]);

    // Открытие/закрытие
    useEffect(() => {
        if (isOpen) {
            setMounted(true);
            const id = requestAnimationFrame(() => {
                const id2 = requestAnimationFrame(() => setActive(true));
                return () => cancelAnimationFrame(id2);
            });
            document.addEventListener("keydown", handleEscape);
            return () => {
                cancelAnimationFrame(id);
                document.removeEventListener("keydown", handleEscape);
            };
        } else {
            setActive(false);
        }
    }, [isOpen, handleEscape]);

    useEffect(() => {
        const el = overlayRef.current;
        if (!el) return;
        const onEnd = (e) => {
            if (e.target !== el) return;
            if (!active) setMounted(false);
        };
        el.addEventListener("transitionend", onEnd);
        return () => el.removeEventListener("transitionend", onEnd);
    }, [active]);

    if (!mounted) return null;

    return createPortal(
        <div
            ref={overlayRef}
            className={`${styles.modal__overlay} ${active ? styles.show : ""}`}
        >
            <div className={styles.modal__content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
