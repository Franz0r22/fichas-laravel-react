import React from 'react'
import { CiCircleCheck } from "react-icons/ci";
import styles from './CarFeatures.module.css'

const CarFeatures = ({ features }) => {
    return (
        <div className={`${styles.titleBox} mt-4 p-4`}>
            <h3 className={`${styles.carTitle} mb-4`}>Equipamiento</h3>
            <ul className={styles.equipmentGrid}>
                {features.map((feature, index) =>
                    <li key={index}>
                        <CiCircleCheck style={{ color: 'green' }} />
                        {feature}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default CarFeatures;