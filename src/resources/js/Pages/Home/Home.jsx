import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import CarCarousel from "../../Components/CarCarousel/CarCarousel";
import TopCarousel from "../../Components/TopCarousel/TopCarousel";
import useCars from '../../hooks/useCars';


const Home = () => {

    const { props: { data, error } } = usePage();

    const { currentItems } = useCars(data);

    const slides = [
        {
            image: '/images/placeholder.webp',
            label: 'Primer Slide',
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
            <Head title="Home" />

            <TopCarousel slides={slides} />

            <Container style={{ minHeight: "100vh" }} className="my-5">
                <Row className="justify-content-md-center">
                    <Col md="auto" className="text-center mb-4">
                        <h4 className="fw-bold text-uppercase">
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
