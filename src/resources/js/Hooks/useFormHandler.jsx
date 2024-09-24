import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import useFormValidation from './useFormValidation';

const useFormHandler = (initialData, honeypot, endpoint) => {
    const { data, setData, post, processing, errors: serverErrors, reset } = useForm({
        ...initialData,
        [honeypot.nameFieldName]: '',
        [honeypot.validFromFieldName]: honeypot.encryptedValidFrom || '',
        captcha_token: '',
    });

    const [showNotification, setShowNotification] = useState(false);
    const [isReadyToPost, setIsReadyToPost] = useState(false);
    const { validateForm, getError } = useFormValidation(data, serverErrors);
    const { executeRecaptcha } = useGoogleReCaptcha();
    console.log(data);
    useEffect(() => {
        if (isReadyToPost && data.captcha_token) {
            post(endpoint, {
                preserveScroll: true,
                onSuccess: (response) => {
                    console.log('Formulario enviado con éxito:', response);
                    reset();
                    setShowNotification(true);
                },
                onError: (errors) => {
                    console.error('Error al enviar el formulario:', errors);
                }
            });
            setIsReadyToPost(false);
        }
    }, [isReadyToPost, data.captcha_token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm(data)) {
            if (!executeRecaptcha) {
                console.log('Execute recaptcha not yet available');
                return;
            }
            try {
                const token = await executeRecaptcha('form');
                setData('captcha_token', token);
                setIsReadyToPost(true);
            } catch (error) {
                console.error('Error al enviar el formulario:', error); 
            }
        } else {
            console.log('Formulario no válido');
        }
    };

    return {
        data,
        handleChange,
        handleSubmit,
        processing,
        showNotification,
        setShowNotification,
        getError,
    };
};

export default useFormHandler;