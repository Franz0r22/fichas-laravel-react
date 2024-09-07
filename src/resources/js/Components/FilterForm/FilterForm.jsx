import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import styles from './FilterForm.module.css';

const FilterForm = ({
    uniqueBrands,
    uniqueModels,
    uniqueFuels,
    uniqueLabels,
    selectedYearRange,
    setSelectedYearRange,
    selectedPriceRange,
    setSelectedPriceRange,
    selectedKmRange,
    setSelectedKmRange,
    minYear,
    maxYear,
    minPrice,
    maxPrice,
    minKm,
    maxKm,
    selectedBrand,
    setSelectedBrand,
    selectedModel,
    setSelectedModel,
    selectedFuel,
    setSelectedFuel,
    selectedLabel,
    setSelectedLabel,
    setCurrentPage
}) => {

    const handleRangePriceChange = (value) => {
        setSelectedPriceRange(value);
        setCurrentPage(1);
    };

    const handleRangeYearChange = (value) => {
        setSelectedYearRange(value);
        setCurrentPage(1);
    };

    const handleRangeKmChange = (value) => {
        setSelectedKmRange(value);
        setCurrentPage(1);
    };

    return (
        <Form className={styles.formBox}>
            <Row className='gy-3'>
                <Col lg={3}>
                    <Form.Group>
                        <Form.Label className={styles.formLabel}>Marca</Form.Label>
                        <Form.Select
                            className={styles.formSelect}
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
                        <Form.Label className={styles.formLabel}>Modelo</Form.Label>
                        <Form.Select
                            className={styles.formSelect}
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
                        <Form.Label className={styles.formLabel}>Combustible</Form.Label>
                        <Form.Select
                            className={styles.formSelect}
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
                        <Form.Label className={styles.formLabel}>Promoción</Form.Label>
                        <Form.Select
                            className={styles.formSelect}
                            value={selectedLabel}
                            onChange={e => {
                                setSelectedLabel(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="">Todos</option>
                            {uniqueLabels.map(label => (
                                <option key={label} value={label}>
                                    {label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col lg={3}>
                    <Form.Group>
                        <Form.Label className={styles.formLabel}>Año</Form.Label>
                        <RangeSlider
                            className="custom-slider"
                            min={minYear}
                            max={maxYear}
                            step={1}
                            value={selectedYearRange}
                            onInput={handleRangeYearChange}
                        />
                        <div className="d-flex justify-content-between fs-14 mt-2">
                            <span>{`${selectedYearRange[0]}`}</span>
                            <span>{`${selectedYearRange[1]}`}</span>
                        </div>
                    </Form.Group>
                </Col>
                <Col lg={3}>
                    <Form.Group>
                        <Form.Label className={styles.formLabel}>Precio</Form.Label>
                        <RangeSlider
                            className="custom-slider"
                            min={minPrice}
                            max={maxPrice}
                            step={100}
                            value={selectedPriceRange}
                            onInput={handleRangePriceChange}
                        />
                        <div className="d-flex justify-content-between fs-14 mt-2">
                            <span>{`$${selectedPriceRange[0].toLocaleString()}`}</span>
                            <span>{`$${selectedPriceRange[1].toLocaleString()}`}</span>
                        </div>
                    </Form.Group>
                </Col>
                <Col lg={3}>
                    <Form.Group>
                        <Form.Label className={styles.formLabel}>Kilometraje</Form.Label>
                        <RangeSlider
                            className="custom-slider"
                            min={minKm}
                            max={maxKm}
                            step={1}
                            value={selectedKmRange}
                            onInput={handleRangeKmChange}
                        />
                        <div className="d-flex justify-content-between fs-14 mt-2">
                            <span>{`${selectedKmRange[0].toLocaleString()} Km`}</span>
                            <span>{`${selectedKmRange[1].toLocaleString()} Km`}</span>
                        </div>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
};

export default FilterForm;
