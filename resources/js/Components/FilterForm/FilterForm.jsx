import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import styles from './FilterForm.module.css';

const FilterForm = ({
    uniqueYears,
    uniqueBrands,
    uniqueModels,
    selectedYear,
    setSelectedYear,
    selectedBrand,
    setSelectedBrand,
    selectedModel,
    setSelectedModel,
    setCurrentPage
}) => {
    return (
        <Form className='mb-4'>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Marca</Form.Label>
                        <Form.Select
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
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Modelo</Form.Label>
                        <Form.Select
                            value={selectedModel}
                            onChange={e => {
                                setSelectedModel(e.target.value);
                                setCurrentPage(1);
                                setSelectedYear('');
                            }}
                            disabled={!selectedBrand}
                            style={{ cursor: !selectedBrand ? 'not-allowed' : 'default' }}
                        >
                            <option value="">{selectedBrand ? 'Todos los modelos' : 'Debes seleccionar una marca'}</option>
                            {uniqueModels.map(model => (
                                <option key={model} value={model}>
                                    {model}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Año</Form.Label>
                        <Form.Select
                            value={selectedYear}
                            onChange={e => {
                                setSelectedYear(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="">{uniqueYears.length > 0 ? 'Todos los años' : 'No existen años para los filtros aplicados'}</option>
                            {uniqueYears.map(year => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
};

export default FilterForm;
