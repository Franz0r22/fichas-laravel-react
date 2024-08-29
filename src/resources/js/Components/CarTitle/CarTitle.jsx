import React from "react";
import styles from './CarTitle.module.css'

const CarTitle = ({ brand, model, version }) => {
    return (
        <>
            <h1 className={styles.carTitle}>
                {brand} {model}
            </h1>
            <h2 className={styles.versionTitle}>{version}</h2>
        </>
    );
};

export default CarTitle;
