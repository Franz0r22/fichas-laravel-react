import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Form, Button, Alert } from 'react-bootstrap';
import styles from './CarQuoteForm.module.css';

const CarQuoteForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        rut: '',
        message: '',
    });

    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            post('/quote', {
                onSuccess: () => {
                    reset();
                    setValidated(false);
                },
                onError: (errors) => console.error(errors),
                preserveScroll: true,
            });
        }
        setValidated(true);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h5 className={`${styles.carTitle}`}>Cotízalo Aquí</h5>

            <Form.Group controlId="name">
                <Form.Label className={styles.formLabel}>Nombre</Form.Label>
                <Form.Control
                    className={styles.formInput}
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    isInvalid={!!errors.name}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name || 'Por favor ingresa tu nombre.'}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label className={styles.formLabel}>Email</Form.Label>
                <Form.Control
                    className={styles.formInput}
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    isInvalid={!!errors.email}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email || 'Por favor ingresa un email válido.'}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="rut">
                <Form.Label className={styles.formLabel}>Rut</Form.Label>
                <Form.Control
                    className={styles.formInput}
                    type="text"
                    value={data.rut}
                    onChange={(e) => setData('rut', e.target.value)}
                    isInvalid={!!errors.rut}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    {errors.rut || 'Por favor ingresa un RUT válido.'}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="message">
                <Form.Label className={styles.formLabel}>Mensaje</Form.Label>
                <Form.Control
                    className={styles.formMessage}
                    as="textarea"
                    rows={3}
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    isInvalid={!!errors.message}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    {errors.message || 'Por favor ingresa un mensaje.'}
                </Form.Control.Feedback>
            </Form.Group>

            <button type="submit" disabled={processing} className={`${styles.btnForm} mt-3`}>
                Enviar
            </button>
        </Form>
    );
};

export default CarQuoteForm;
