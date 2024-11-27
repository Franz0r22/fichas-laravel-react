import React from 'react'
import { Head } from '@inertiajs/react'
import { Container, Row, Col, Button } from 'react-bootstrap'

const NotFound = () => {
    return (
        <>
            <Head>
                <title>404 - Página no encontrada</title>
                <meta 
                    name="description" 
                    content="Lo sentimos, la página que buscas no existe"
                />
            </Head>
            
            <Container fluid className="bg-light min-vh-100">
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col xs={12} md={6} className="text-center">
                        <h1 className="display-1 fw-bold">404</h1>
                        <p className="fs-4 text-secondary mb-4">
                            Lo sentimos, la página que buscas no existe
                        </p>
                        <Button 
                            href={route('home')}
                            variant="primary"
                            size="lg"
                            className="px-4"
                        >
                            Volver al inicio
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default NotFound