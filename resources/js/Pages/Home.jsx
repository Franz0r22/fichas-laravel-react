import { Head } from "@inertiajs/react";
import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Home = ({ name }) => {

  const [count, setCount] = useState(0);

    return (
        <>
            <Head title="Home" />

            <Container style={{ height: '65vh' }} className="mt-5">
                <Row className="justify-content-md-center">
                    <Col md="auto" className="text-center">
                        <h1>
                           Laravel con React e Inertia.js
                        </h1>
                        <p>Contador: {count}</p>
                        <Button
                            variant="primary"
                            onClick={() => setCount(count + 1)}
                            className="me-2"
                        >
                            Incrementar
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => setCount(count - 1)}
                        >
                            Decrementar
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;
