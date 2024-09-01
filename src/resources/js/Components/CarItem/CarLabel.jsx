import React from 'react'
import styles from './CarLabel.module.css'

const CarLabel = ({ labelName }) => {
  return (
    <div className={styles.labelPosition}>
      {labelName}
    </div>
  )
}

export default CarLabel
