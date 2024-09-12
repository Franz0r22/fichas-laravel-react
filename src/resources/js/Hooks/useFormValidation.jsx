import { useState, useCallback } from 'react';
import { validateName, validateEmail, validateRut, validateMessage } from '../utils/validations';

const useFormValidation = (initialData, serverErrors) => {
  const [clientErrors, setClientErrors] = useState({});

  const validateField = useCallback((name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'rut':
        error = validateRut(value);
        break;
      case 'message':
        error = validateMessage(value);
        break;
      default:
        break;
    }
    return error;
  }, []);

  const validateForm = useCallback((data) => {
    const newErrors = Object.keys(data).reduce((acc, key) => {
      acc[key] = validateField(key, data[key]);
      return acc;
    }, {});
    setClientErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  }, [validateField]);

  const getError = useCallback((field) => {
    return clientErrors[field] || serverErrors[field];
  }, [clientErrors, serverErrors]);

  return {
    clientErrors,
    validateField,
    validateForm,
    getError
  };
};

export default useFormValidation;