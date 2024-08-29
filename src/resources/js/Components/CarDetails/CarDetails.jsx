import React from "react";
import styles from './CarDetails.module.css'
import { formatNumber } from "../../utils/formatNumber";

const CarDetails = ({ year, kilometers, transmission, fuel }) => {
    return (
        <div className={styles.detailsBox}>
            <span>{year} |</span>
            <span>
                {`${formatNumber(kilometers)} Km`} |
            </span>
            <span>{transmission.replace("Transmisión ", "")} |</span>
            <span>{fuel}</span>
        </div>
    );
};

export default CarDetails;
