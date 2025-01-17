import React from 'react'
import { CiCircleCheck } from "react-icons/ci";
import styles from './CarFeatures.module.css';

const CarFeatures = ({ iconsFeatures }) => {
    return (
        <div className={`${styles.titleBox} mt-4 p-4`}>
            <h3 className={`${styles.carTitle} mb-4`}>Equipamiento</h3>
            <ul className={`${styles.equipmentGrid} daimlerCsFont`}>
                {Object.entries(iconsFeatures).map(([caracteristica, imagen]) => (
                    <li className="px-lg-2 px-0" key={caracteristica}>
                        {imagen ? (
                            <>
                                <img
                                    width="25px"
                                    height="25px"
                                    src={imagen}
                                    alt={caracteristica}
                                    style={{ opacity: 1, color: 'black' }}
                                />
                                &nbsp;&nbsp;{caracteristica}
                            </>
                        ) : (
                            <span>
                                <CiCircleCheck style={{ color: 'green' }} /> {caracteristica}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CarFeatures;