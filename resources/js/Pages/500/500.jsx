import React from 'react'
import { Head } from '@inertiajs/react'
import { Container, Row, Col, Button } from 'react-bootstrap'

const ServerError = () => {
    return (
        <>
            <Head>
                <title>500 - Error del servidor</title>
                <meta 
                    name="description" 
                    content="Ha ocurrido un error en el servidor. Por favor, inténtalo más tarde."
                />
            </Head>
            
            <Container fluid className="bg-light min-vh-100">
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col xs={12} md={6} className="text-center">
                        <h1 className="display-1 fw-bold">500</h1>
                        <p className="fs-4 text-secondary mb-4">
                            ¡Ups! Algo salió mal en nuestro servidor
                        </p>
                        <p className="text-muted mb-4">
                            Estamos trabajando para solucionar el problema. 
                            Por favor, inténtalo de nuevo más tarde.
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

export default ServerError 