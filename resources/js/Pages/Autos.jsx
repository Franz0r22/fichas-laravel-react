import React from 'react';
import {  Head, usePage } from '@inertiajs/react';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';

const Autos = () => {
    const { data, error } = usePage().props;

    if (!data) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (

        <> 
            <Head title="Autos" />

            <Container style={{ minHeight: '100vh' }} className="my-5">
                <Row>
                    {data.map((auto) => (
                        <Col key={auto.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={auto.url_foto_particular} />
                                <Card.Body>
                                    <Card.Title>
                                        {auto.MARCA} {auto.MODELO}
                                    </Card.Title>
                                    <Card.Text>{auto.VCHMONEDA} {auto.VCHPRECIO.toLocaleString()}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>  
        </>
    );
};

export default Autos;
