import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import CarCarousel from "../../Components/CarCarousel/CarCarousel";
import TopCarousel from "../../Components/TopCarousel/TopCarousel";
import useCars from "../../Hooks/useCars";
import placeholder from "@images/placeholder.webp";

const Home = () => {
    const {
        props: { data, error },
    } = usePage();

    const { currentItems } = useCars(data);

    const slides = [
        {
            image: placeholder,
            label: "Primer Slide",
            // text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
        },
        // {
        //     // image: 'path/to/image2.jpg',
        //     // label: 'Segundo Slide',
        //     // text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        // },
        // {
        //     // image: 'path/to/image3.jpg',
        //     // label: 'Tercer Slide',
        //     // text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
        // }
    ];

    if (!currentItems) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <>
            <Head>
                <title>Home</title>
                <meta
                    name="description"
                    content="Visita nuestra web para cotizar autos usados de forma rápida y sencilla. Compara precios, accede a detalles completos y encuentra el vehículo ideal para ti. Tu próximo auto te está esperando."
                />
            </Head>

            <TopCarousel slides={slides} />

            <Container style={{ minHeight: "100vh" }} className="my-5">
                <Row className="justify-content-md-center">
                    <Col md="auto" className="text-center mb-4">
                        <h4 className="fw-bold text-uppercase fs-24">
                            Vehículos Destacados
                        </h4>
                    </Col>
                    <CarCarousel currentItems={currentItems} />
                </Row>
            </Container>
        </>
    );
};

export default Home;
