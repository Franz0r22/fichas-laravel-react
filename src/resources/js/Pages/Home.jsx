import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { Container, Row, Col } from "react-bootstrap";
import CarList from "../Components/CarList/CarList";
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
                    <CarList currentItems={currentItems} /> {/*TODO: Cambiar por componente Swiper y Probar Navegacion CLIENT SIDE */}
                </Row>
            </Container>
        </>
    );
};

export default Home;
