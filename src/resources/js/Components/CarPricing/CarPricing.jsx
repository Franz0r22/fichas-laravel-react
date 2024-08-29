import React from 'react';
import styles from './CarPricing.module.css';
import { formatNumber } from '../../utils/formatNumber';

const CarPricing = ({ currency, price }) => {
    return (
        <div className={styles.carPricing}>
            {price != null ? (
                <h3 className={styles.carPrice}>
                    <span className={styles.monedaSize}>{currency}</span>{formatNumber(price)}
                </h3>
            ) : (
                <h3 className={styles.carPrice}>Consultar precio</h3>
            )}
        </div>
    );
};

export default CarPricing;
