import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import CarCarousel from "../Components/CarCarousel/CarCarousel";
import useCars from '../hooks/useCars';


const Home = () => {

    const { props: { data, error } } = usePage();

    const { currentItems } = useCars(data);

    if (!currentItems) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <>
            <Head title="Home" />

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
