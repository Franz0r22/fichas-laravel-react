import React from 'react'
import styles from './CarDescription.module.css'

const CarDescription = ({ Description }) => {
    return (
        <div>
            <h3 className={`${styles.carTitle}`}>Descripción</h3>
            <p className='mb-4'>
                {Description}
            </p>
        </div>
    )
}

export default CarDescription