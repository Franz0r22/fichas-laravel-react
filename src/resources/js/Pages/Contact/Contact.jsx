import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { usePage, Head } from "@inertiajs/react";
import ContactForm from "../../Components/ContactForm/ContactForm";
import CarMap from "../../Components/CarMap/CarMap";

const Contact = () => {
    const { honeypot } = usePage().props;
    const latitude = -33.4569;
    const longitude = -70.6483;

    return (
        <>
            <Head title="Contacto" />
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col md={7} className="p-5">
                        <h1 className="fw-bold text-uppercase fs-30 text-blue pt-4 text-center">
                            Contacto
                        </h1>
                        <hr className={`mx-auto my-2 cardDividerTitle`} />
                        <ContactForm honeypot={honeypot} />
                    </Col>
                    <Col md={5} className="p-5">
                        <CarMap 
                            latitude={latitude}
                            longitude={longitude}
                            clientLogo={`${window.assetBaseUrl}images/logo.png`}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Contact;
