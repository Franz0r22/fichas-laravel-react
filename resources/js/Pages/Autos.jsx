import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Container, Row, Col, Card, Alert, Spinner, Form, Button, Pagination } from 'react-bootstrap';

const Autos = () => {
    const { data, error } = usePage().props;

    const [selectedYear, setSelectedYear] = useState('');
    const [uniqueYears, setUniqueYears] = useState([]);
    
    const [selectedBrand, setSelectedBrand] = useState('');
    const [uniqueBrands, setUniqueBrands] = useState([]);

    const [selectedModel, setSelectedModel] = useState('');
    const [uniqueModels, setUniqueModels] = useState([]);
    const [modelsByBrand, setModelsByBrand] = useState({});
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    useEffect(() => {
        if (data) {

            const years = [...new Set(data.map(auto => auto.INTANO))].sort((a, b) => b - a);
            setUniqueYears(years);

            const brands = [... new Set(data.map(auto => auto.MARCA))].sort();
            setUniqueBrands(brands);

            const modelsMap = {};
            data.forEach(auto => {
                if (!modelsMap[auto.MARCA]) {
                    modelsMap[auto.MARCA] = new Set();
                }
                modelsMap[auto.MARCA].add(auto.MODELO);
            });
            setModelsByBrand(modelsMap);
        }
    }, [data]);

    useEffect(() => {
        const filteredData = handleFilter();
        const years = [...new Set(filteredData.map(auto => auto.INTANO))].sort((a, b) => b - a);
        setUniqueYears(years);
    
    }, [selectedBrand, selectedModel, data]);

    useEffect(() => {

        if (selectedBrand && modelsByBrand[selectedBrand]) {
            setUniqueModels([...modelsByBrand[selectedBrand]]);
        } else {
            setUniqueModels([]);
        }

        if (selectedBrand && (selectedModel === '' || uniqueModels.includes(selectedModel))) {
            const filteredData = handleFilter();
            const years = [...new Set(filteredData.map(auto => auto.INTANO))].sort((a, b) => b - a);
            setUniqueYears(years);
        }

    }, [selectedBrand, selectedModel, modelsByBrand]);

    const handleFilter = () => {
        return data.filter(auto => {
            const yearMatch = selectedYear ? auto.INTANO === parseInt(selectedYear) : true;
            const brandMatch = selectedBrand ? auto.MARCA === selectedBrand : true;
            const modelMatch = selectedModel ? auto.MODELO === selectedModel : true;
            return yearMatch && brandMatch && modelMatch;
        });
    };

    const filteredData = handleFilter();

     const indexOfLastItem = currentPage * pageSize;
     const indexOfFirstItem = indexOfLastItem - pageSize;
     const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
     const totalPages = Math.ceil(filteredData.length / pageSize);

    if (!data) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (

        <> 
            <Head title="Autos" />

            <Container style={{ minHeight: '100vh' }} className="my-5">
                <Form className="mb-4">
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Marca</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedBrand}
                                    onChange={e => {
                                        setSelectedBrand(e.target.value);
                                        setSelectedModel('');
                                        setSelectedYear('');
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value="">Todas las marcas</option>
                                    {uniqueBrands.map(brand => (
                                        <option key={brand} value={brand}>
                                            {brand}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>                        
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Modelo</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedModel}
                                    onChange={e => {
                                        setSelectedModel(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    disabled={!selectedBrand}
                                >
                                    <option value="">{selectedBrand ? 'Todos los modelos' : 'Debes seleccionar una marca'}</option>
                                    {uniqueModels.map(model => (
                                        <option key={model} value={model}>
                                            {model}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>                        
                        </Col>
                        <Col>
                        <Form.Group>
                                <Form.Label>Año</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedYear}
                                    onChange={e => {
                                        setSelectedYear(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                >{console.log(uniqueYears)}
                                    <option value="">{uniqueYears != '' ? 'Todos los años' : 'No existen años para los filtros aplicados'}</option>
                                    {uniqueYears.map(year => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>

                <Row>
                    {currentItems.length > 0 ? (
                        currentItems.map((auto) => (
                            <Col key={auto.AUTOID} sm={12} md={6} lg={4} xl={3} className="mb-4">
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
                            ))
                        ) : (
                        <Col className="text-center">
                            <Alert variant="info">No se encontraron vehículos que coincidan con los filtros aplicados.</Alert>
                        </Col>
                    )}
                </Row>

                <Pagination className="justify-content-center mt-4">
                    <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                    {[...Array(totalPages)].map((_, idx) => (
                        <Pagination.Item key={idx + 1} active={idx + 1 === currentPage} onClick={() => setCurrentPage(idx + 1)}>
                            {idx + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            </Container>
        </>
    );
};

export default Autos;
