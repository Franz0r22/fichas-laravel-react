import React, { useEffect } from 'react';
import { FaRegCheckCircle } from "react-icons/fa";
import styles from './Notification.module.css';

const Notification = ({ message, isVisible, onClose, duration = 4000 }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose, duration]);

    if (!isVisible) return null;

    return (
        <>
            <div className={styles.backdrop} onClick={onClose}></div>
            <div className={styles.notification}>
                <FaRegCheckCircle size={48} className={styles.icon} />
                {message}
            </div>
        </>
    );
};

export default Notification;