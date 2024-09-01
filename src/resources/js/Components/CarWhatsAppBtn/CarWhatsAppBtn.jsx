import React from "react";
import PropTypes from "prop-types";
import styles from "./CarWhatsAppBtn.module.css";
import { MdWhatsapp } from "react-icons/md";

const CarWhatsAppBtn = ({ whatsApp, brandName, modelName, version }) => {
    if (!whatsApp || !brandName || !modelName) return null;

    const whatsAppNumber = whatsApp.replace("+", "");
    const url = window.location.href;
    const message = `Estoy interesado en el vehículo ${brandName} ${modelName} ${version}, ${url}`;

    return (
        <a
            href={`https://api.whatsapp.com/send?phone=${whatsAppNumber}&text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.WhatsAppBtn}
            aria-label={`Chatea con un ejecutivo sobre ${brandName} ${modelName}`}
        >
            <MdWhatsapp className={styles.icon} />
            Chatea con un ejecutivo
        </a>
    );
};

CarWhatsAppBtn.propTypes = {
    whatsApp: PropTypes.string.isRequired,
    brandName: PropTypes.string.isRequired,
    modelName: PropTypes.string.isRequired,
    version: PropTypes.string,
};

export default CarWhatsAppBtn;
