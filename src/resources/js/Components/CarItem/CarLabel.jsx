import React from 'react'
import styles from './CarLabel.module.css'

const CarLabel = ({ labelName, labelColor, fontcolor }) => {
  return (
    <div className={styles.labelPosition} style={{ backgroundColor: labelColor, color: fontcolor}}>
      {labelName}
    </div>
  )
}

export default CarLabel
