import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { usePage, Head } from '@inertiajs/react';
import FinancingForm from '../../Components/FinancingForm/FinancingForm';

const Financing = () => {
    const { honeypot } = usePage().props;

    return (

        <>
            <Head title="Financiamiento" />
            <Container style={{ minHeight: "100vh" }} className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h1>Financiamiento</h1>
                    <h5>¿Estás interesado en financiar tu próximo vehículo? </h5>
                    <p>Completa el siguiente formulario con tus datos y preferencias de financiamiento. Nuestro equipo se pondrá en contacto contigo para ofrecerte las mejores opciones adaptadas a tus necesidades.</p>
                    <FinancingForm honeypot={honeypot} />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Financing;