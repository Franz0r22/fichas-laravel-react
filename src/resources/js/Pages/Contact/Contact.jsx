import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { usePage, Head } from '@inertiajs/react';
import ContactForm from '../../Components/ContactForm/ContactForm';

const Contact = () => {
    const { honeypot } = usePage().props;

    return (

        <>
            <Head title="Contacto" />
            <Container style={{ minHeight: "100vh" }} className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h1>Contacto</h1>
                    <p>Si tienes alguna pregunta o comentario, por favor completa el siguiente formulario y nos pondremos en contacto contigo lo antes posible.</p>
                    <ContactForm honeypot={honeypot} />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Contact;