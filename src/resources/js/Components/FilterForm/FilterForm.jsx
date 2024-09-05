import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import styles from './FilterForm.module.css';

const FilterForm = ({
    uniqueYears,
    uniqueBrands,
    uniqueModels,
    uniqueFuels,
    selectedYear,
    setSelectedYear,
    selectedBrand,
    setSelectedBrand,
    selectedModel,
    setSelectedModel,
    selectedPriceRange,
    setSelectedPriceRange,
    selectedFuel,
    setSelectedFuel,
    minPrice,
    maxPrice,
    setCurrentPage
}) => {

    const handleRangeChange = (value) => {
        setSelectedPriceRange(value);
        setCurrentPage(1);
    };
    
    return (
        <Form className='mb-4'>
            <Row>
                <Col lg={3}>
                    <Form.Group>
                        <Form.Label>Marca</Form.Label>
                        <Form.Select
                            value={selectedBrand}
                            onChange={e => {
                                setSelectedBrand(e.target.value);
                                setSelectedModel('');
                                // setSelectedYear('');
                                // setSelectedFuel('');
                                setSelectedPriceRange([minPrice, maxPrice]);
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
                <Col lg={3}>
                    <Form.Group>
                        <Form.Label>Modelo</Form.Label>
                        <Form.Select
                            value={selectedModel}
                            onChange={e => {
                                setSelectedModel(e.target.value);
                                setCurrentPage(1);
                                setSelectedYear('');
                                setSelectedPriceRange([minPrice, maxPrice]);
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
                <Col lg={3}>
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
                <Col lg={3}>
                    <Form.Group>
                        <Form.Label>Combustible</Form.Label>
                        <Form.Select
                            value={selectedFuel}
                            onChange={e => {
                                setSelectedFuel(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="">Todos</option>
                            {uniqueFuels.map(fuel => (
                                <option key={fuel} value={fuel}>
                                    {fuel}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col lg={3}>
                    <Form.Group>
                        <Form.Label>Precio</Form.Label>
                        <RangeSlider
                            min={minPrice}
                            max={maxPrice}
                            step={10000000}
                            defaultValue={selectedPriceRange}
                            onInput={handleRangeChange}
                        />
                        <div className="d-flex justify-content-between">
                            <span>{`$${selectedPriceRange[0].toLocaleString()}`}</span>
                            <span>{`$${selectedPriceRange[1].toLocaleString()}`}</span>
                        </div>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
};

export default FilterForm;
