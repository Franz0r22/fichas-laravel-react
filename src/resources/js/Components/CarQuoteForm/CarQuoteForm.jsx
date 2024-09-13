import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import InputField from './InputField';
import useFormValidation from '../../Hooks/useFormValidation';
import { formatRut } from '../../utils/validations';
import Notification from '../Notification/Notification';
import styles from './CarQuoteForm.module.css';

const CarQuoteForm = ({ carData, honeypot }) => {
    const { data, setData, post, processing, errors: serverErrors, reset } = useForm({
        name: '',
        email: '',
        rut: '',
        message: '',
        carBrand: carData.brandName,
        carModel: carData.modelName,
        carVersion: carData.version,
        carKilometers: carData.kilometers,
        carYear: carData.year,
        carImage: carData.photos[0],
        carUrl: window.location.href,
        [honeypot.nameFieldName]: '',
        [honeypot.validFromFieldName]: honeypot.encryptedValidFrom || '',
        captcha_token: '',
    });

    const [showNotification, setShowNotification] = useState(false);
    const [isReadyToPost, setIsReadyToPost] = useState(false);
    const { validateForm, getError } = useFormValidation(data, serverErrors);
    const { executeRecaptcha } = useGoogleReCaptcha();

    useEffect(() => {
        if (isReadyToPost && data.captcha_token) {
            post('/quote', {
                preserveScroll: true,
                onSuccess: (response) => {
                    console.log('Formulario enviado con éxito:', response); // Log de éxito
                    reset('name', 'email', 'rut', 'message');
                    setShowNotification(true);
                },
                onError: (errors) => {
                    console.error('Error al enviar el formulario:', errors); // Capturar errores
                }
            });
            setIsReadyToPost(false);
        }
    }, [isReadyToPost, data.captcha_token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'rut') {
            setData(name, formatRut(value));
        } else {
            setData(name, value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm(data)) {
            if (!executeRecaptcha) {
                console.log('Execute recaptcha not yet available');
                return;
            }
            try {
                const token = await executeRecaptcha('quote');
                setData('captcha_token', token);
                setIsReadyToPost(true);
            } catch (error) {
                console.error('Error al enviar el formulario:', error); 
            }
        } else {
            console.log('Formulario no válido');
        }
    };

    return (
        <>
            <Notification 
                message="¡Gracias! Tu mensaje ha sido enviado con éxito. Nos pondremos en contacto contigo pronto."
                isVisible={showNotification}
                onClose={() => setShowNotification(false)}
            />
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <h5 className={styles.carTitle}>Cotízalo Aquí</h5>

                {/* Campos Honeypot */}
                {honeypot.enabled && (
                    <div style={{ display: 'none' }}>
                        <input
                            type="text"
                            name={honeypot.nameFieldName}
                            value={data[honeypot.nameFieldName] || ''}
                            onChange={(e) => setData(honeypot.nameFieldName, e.target.value)}
                        />
                        <input
                            type="text"
                            name={honeypot.validFromFieldName}
                            value={data[honeypot.validFromFieldName] || ''}
                            onChange={(e) => setData(honeypot.validFromFieldName, e.target.value)}
                        />
                    </div>
                )}

                <InputField
                    label="Nombre"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={getError('name')}
                />

                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                    error={getError('email')}
                />

                <InputField
                    label="RUT"
                    name="rut"
                    value={data.rut}
                    onChange={handleChange}
                    error={getError('rut')}
                />

                <div className="form-group">
                    <label htmlFor="message" className={styles.formLabel}>Mensaje</label>
                    <textarea
                        id="message"
                        name="message"
                        value={data.message}
                        onChange={handleChange}
                        className={`form-control ${styles.formMessage} ${getError('message') ? 'is-invalid' : ''}`}
                    />
                    {getError('message') && <div className="invalid-feedback">{getError('message')}</div>}
                </div>

                <button type="submit" disabled={processing} className={`${styles.btnForm} mt-3 ${processing ? styles.btnDisabled : ''}`}>
                    {processing ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
        </>
    );
};

export default CarQuoteForm;
