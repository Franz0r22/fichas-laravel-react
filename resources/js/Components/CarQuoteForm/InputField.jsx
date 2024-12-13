import React from 'react';
import styles from './CarQuoteForm.module.css';

const InputField = ({ label, name, type = 'text', value, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className={styles.formLabel}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`form-control ${styles.formInput} ${error ? 'is-invalid' : ''}`}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default InputField;