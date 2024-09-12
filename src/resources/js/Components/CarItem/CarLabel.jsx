import React from 'react'
import styles from './CarLabel.module.css'

const CarLabel = ({ ribbonName, ribbonColor, ribbonTextColor }) => {

  return (
    <div className={styles.labelPosition} style={{ backgroundColor: ribbonColor, color: ribbonTextColor}}>
      {ribbonName}
    </div>
  )
}

export default CarLabel
