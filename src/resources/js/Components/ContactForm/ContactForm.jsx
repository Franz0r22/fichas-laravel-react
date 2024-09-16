import React from 'react';
import InputField from '../../Components/CarQuoteForm/InputField';
import Notification from '../Notification/Notification';
import styles from './ContactForm.module.css';
import useFormHandler from '../../Hooks/useFormHandler';

const ContactForm = ({ honeypot }) => {
    const initialData = {
        name: '',
        email: '',
        message: '',
    };

    const {
        data,
        handleChange,
        handleSubmit,
        processing,
        showNotification,
        setShowNotification,
        getError,
    } = useFormHandler(initialData, honeypot, '/contact');

    return (
        <>
            <Notification 
                message="¡Gracias! Tu mensaje ha sido enviado con éxito. Nos pondremos en contacto contigo pronto."
                isVisible={showNotification}
                onClose={() => setShowNotification(false)}
            />
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <h5 className={styles.formTitle}>Contáctanos</h5>

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

export default ContactForm;