import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import SelectedFilters from "../SelectedFilters/SelectedFilters";
import styles from "./FilterForm.module.css";
import { formatCategory } from "../../utils/formatCategory";
import { IoChevronForwardOutline } from "react-icons/io5";

const FilterForm = ({
    keyword,
    setKeyword,
    uniqueBrands,
    uniqueModels,
    uniqueFuels,
    uniqueLabels,
    uniqueCategories,
    uniqueSellers,
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
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    selectedModel,
    setSelectedModel,
    selectedFuel,
    setSelectedFuel,
    selectedLabel,
    setSelectedLabel,
    selectedSeller,
    setSelectedSeller,
    setCurrentPage,
}) => {

    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleFilters = () => {
        setIsFiltersVisible(!isFiltersVisible);
    };

    const showLoading = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 500); // Duración del loading: 500ms
    };

    const handleRangePriceChange = (value) => {
        showLoading();
        setSelectedPriceRange(value);
        setCurrentPage(1);
    };

    const handleRangeYearChange = (value) => {
        showLoading();
        setSelectedYearRange(value);
        setCurrentPage(1);
    };

    const handleRangeKmChange = (value) => {
        showLoading();
        setSelectedKmRange(value);
        setCurrentPage(1);
    };

    const handleCheckboxChange = (event) => {
        showLoading();
        const { value, checked } = event.target;

        if (checked) {
            setSelectedLabel([...selectedLabel, value]);
        } else {
            setSelectedLabel(selectedLabel.filter((label) => label !== value));
        }
    };

    const handleCheckboxChangeCategory = (event) => {
        showLoading();
        const { value, checked } = event.target;

        if (checked) {
            setSelectedCategory([...selectedCategory, value]);
        } else {
            setSelectedCategory(selectedCategory.filter((category) => category !== value));
        }
    };

    const handleCheckboxChangeFuel = (event) => {
        showLoading();
        const { value, checked } = event.target;

        if (checked) {
            setSelectedFuel([...selectedFuel, value]);
        } else {
            setSelectedFuel(selectedFuel.filter((fuel) => fuel !== value));
        }
    };

    const handleCheckboxChangeSeller = (event) => {
        showLoading();
        const { value, checked } = event.target;

        if (checked) {
            setSelectedSeller([...selectedSeller, value]);
        } else {
            setSelectedSeller(selectedSeller.filter((seller) => seller !== value));
        }
    };

    const isLatFilter = import.meta.env.VITE_FILTER_LAT === "true";

    const selectedFiltersProps = {
        selectedCategory,
        selectedBrand,
        selectedModel,
        selectedFuel,
        selectedLabel,
        selectedYearRange,
        selectedPriceRange,
        selectedKmRange,
        minYear,
        maxYear,
        minPrice,
        maxPrice,
        minKm,
        maxKm,
        selectedSeller,
        clearBrand: () => setSelectedBrand(""),
        clearModel: () => setSelectedModel(""),
        clearCategory: () => setSelectedCategory(""),
        clearFuel: () => setSelectedFuel(""),
        clearLabel: () => setSelectedLabel(""),
        clearYearRange: () => setSelectedYearRange([minYear, maxYear]),
        clearPriceRange: () => setSelectedPriceRange([minPrice, maxPrice]),
        clearKmRange: () => setSelectedKmRange([minKm, maxKm]),
        clearSeller: () => setSelectedSeller([]),
        clearAllFilters: () => {
            setSelectedBrand("");
            setSelectedModel("");
            setSelectedFuel("");
            setSelectedCategory("");
            setSelectedLabel("");
            setSelectedYearRange([minYear, maxYear]);
            setSelectedPriceRange([minPrice, maxPrice]);
            setSelectedKmRange([minKm, maxKm]);
            setSelectedSeller([]);
            setCurrentPage(1);
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        
        // Solo actualizar si los valores son diferentes a los actuales
        const urlBrand = params.get('brand') || '';
        const urlModel = params.get('model') || '';
        const urlPriceRange = params.get('priceRange')?.split('-').map(Number) || [minPrice, maxPrice];
        const urlYearRange = params.get('yearRange')?.split('-').map(Number) || [minYear, maxYear];
    
        // Actualizar solo si hay cambios
        if (selectedBrand !== urlBrand) {
            setSelectedBrand(urlBrand);
        }
        
        if (selectedModel !== urlModel) {
            setSelectedModel(urlModel);
        }
        
        if (JSON.stringify(selectedPriceRange) !== JSON.stringify(urlPriceRange)) {
            setSelectedPriceRange(urlPriceRange);
        }
        
        if (JSON.stringify(selectedYearRange) !== JSON.stringify(urlYearRange)) {
            setSelectedYearRange(urlYearRange);
        }
    }, [location.search]); // Eliminamos dependencias innecesarias


    return (
        <>
            <div className={`${styles.loadingOverlay} ${isLoading ? styles.loadingVisible : ''}`}>
                <div className={styles.spinner}></div>
            </div>

            <button
                type="button"
                className={`d-flex d-md-none align-items-center justify-content-center fs-12 ${styles.filterButton}`}
                onClick={toggleFilters}
            >
                <span className="me-1">
                    FILTROS
                </span>
                <IoChevronForwardOutline />
            </button>

            <div
                className={`${styles.overlay} ${isFiltersVisible ? styles.overlayVisible : ''}`}
                onClick={() => setIsFiltersVisible(false)}
            />

            <Form className={`${styles.formBox} ${isFiltersVisible ? styles.formBoxVisible : ''}`}>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Buscar autos..."
                />
                <div className={`${!isLatFilter ? 'd-md-none' : ''}`}>
                    <SelectedFilters {...selectedFiltersProps} />
                </div>
                
                <div className="d-md-none position-absolute top-0 end-0 p-3">
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setIsFiltersVisible(false)}
                    />
                </div>
                
                <Row className="gy-3">
                    {isLatFilter ? (
                        <Col lg={3}>
                            <Form.Group>
                                <Form.Label className={styles.formLabel}>
                                    Categoría
                                </Form.Label>
                                {uniqueCategories.map((category) => (
                                    <Form.Check
                                        key={category}
                                        type="checkbox"
                                        label={formatCategory(category)}
                                        id={category}
                                        value={category}
                                        checked={selectedCategory.includes(category)}
                                        onChange={handleCheckboxChangeCategory}
                                    />))}
                            </Form.Group>
                        </Col>
                    ) :
                        (
                            <Col lg={3}>
                                <Form.Group>
                                    <Form.Label className={styles.formLabel}>
                                        Categoría
                                    </Form.Label>
                                    <Form.Select
                                        className={styles.formSelect}
                                        value={selectedCategory}
                                        onChange={(e) => {
                                            setSelectedCategory(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <option value="">Todas las categorías</option>
                                        {uniqueCategories.map((category) => (
                                            <option key={category} value={category}>
                                                {formatCategory(category)}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>)}

                    <Col lg={isLatFilter ? 12 : 3}>
                        <Form.Group>
                            <Form.Label className={styles.formLabel}>
                                Marca
                            </Form.Label>
                            <Form.Select
                                className={styles.formSelect}
                                value={selectedBrand}
                                onChange={(e) => {
                                    showLoading();
                                    setSelectedBrand(e.target.value);
                                    setSelectedModel("");
                                    setSelectedPriceRange([minPrice, maxPrice]);
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="">Todas las marcas</option>
                                {uniqueBrands.map((brand) => (
                                    <option key={brand} value={brand}>
                                        {brand}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col lg={isLatFilter ? 12 : 3}>
                        <Form.Group>
                            <Form.Label className={styles.formLabel}>
                                Modelo
                            </Form.Label>
                            <Form.Select
                                className={styles.formSelect}
                                value={selectedModel}
                                onChange={(e) => {
                                    showLoading();
                                    setSelectedModel(e.target.value);
                                    setCurrentPage(1);
                                    setSelectedPriceRange([minPrice, maxPrice]);
                                }}
                                disabled={!selectedBrand}
                                style={{
                                    cursor: !selectedBrand
                                        ? "not-allowed"
                                        : "default",
                                }}
                            >
                                <option value="">
                                    {selectedBrand
                                        ? "Todos los modelos"
                                        : "Debes seleccionar una marca"}
                                </option>
                                {uniqueModels.map((model) => (
                                    <option key={model} value={model}>
                                        {model}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    {isLatFilter ? (
                        <Col lg={12}>
                            <Form.Group>
                                <Form.Label className={styles.formLabel}>
                                    Combustible
                                </Form.Label>
                                {uniqueFuels.map((fuel) => (
                                    <Form.Check
                                        key={fuel}
                                        type="checkbox"
                                        label={fuel}
                                        id={fuel}
                                        value={fuel}
                                        checked={selectedFuel.includes(fuel)}
                                        onChange={handleCheckboxChangeFuel}
                                    />
                                ))}
                            </Form.Group>
                        </Col>
                    ) : (
                        <Col lg={3}>
                            <Form.Group>
                                <Form.Label className={styles.formLabel}>
                                    Combustible
                                </Form.Label>
                                <Form.Select
                                    className={styles.formSelect}
                                    value={selectedFuel}
                                    onChange={(e) => {
                                        setSelectedFuel(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value="">Todos</option>
                                    {uniqueFuels.map((fuel) => (
                                        <option key={fuel} value={fuel}>
                                            {fuel}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    )}
                    {uniqueLabels && uniqueLabels.length > 0 && (
                        isLatFilter ? (
                            //Checkboxes Filtro Lateral
                            <Col lg={12}>
                                <Form.Group>
                                    <Form.Label className={styles.formLabel}>
                                        Promoción
                                    </Form.Label>
                                    {uniqueLabels.map((label) => (
                                        <Form.Check
                                            key={label}
                                            type="checkbox"
                                            label={label.toLowerCase()}
                                            id={label}
                                            value={label}
                                            checked={selectedLabel.includes(label)}
                                            onChange={handleCheckboxChange}
                                            style={{ textTransform: 'capitalize' }}
                                        />
                                    ))}
                                </Form.Group>
                            </Col>
                        ) : (
                            //Select Filtro Superior
                            <Col lg={3}>
                                <Form.Group>
                                    <Form.Label className={styles.formLabel}>
                                        Promoción
                                    </Form.Label>
                                    <Form.Select
                                        className={styles.formSelect}
                                        value={selectedLabel}
                                        onChange={(e) => {
                                            setSelectedLabel(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <option value="">Todos</option>
                                        {uniqueLabels.map((label) => (
                                            <option key={label} value={label}>
                                                {label}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        )
                    )}
                    {uniqueSellers.length > 1 ? (
                        isLatFilter ? (
                            <Col lg={12}>
                                <Form.Group>
                                    <Form.Label className={styles.formLabel}>
                                        Sucursal
                                    </Form.Label>
                                    {uniqueSellers.map((seller) => (
                                        <Form.Check
                                            key={seller}
                                            type="checkbox"
                                            label={seller}
                                            id={seller}
                                            value={seller}
                                            checked={selectedSeller.includes(seller)}
                                            onChange={handleCheckboxChangeSeller}
                                        />
                                    ))}
                                </Form.Group>
                            </Col>
                        ) : (
                            <Col lg={3}>
                                <Form.Group>
                                    <Form.Label className={styles.formLabel}>
                                        Sucursal
                                    </Form.Label>
                                    <Form.Select
                                        className={styles.formSelect}
                                        value={selectedSeller}
                                        onChange={(e) => {
                                            setSelectedSeller(e.target.value ? [e.target.value] : []);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <option value="">Todas las sucursales</option>
                                        {uniqueSellers.map((seller) => (
                                            <option key={seller} value={seller}>
                                                {seller}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        )
                    ) : null}
                    <Col lg={isLatFilter ? 12 : 3}>
                        <Form.Group>
                            <Form.Label className={styles.formLabel}>
                                Año
                            </Form.Label>
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
                    <Col lg={isLatFilter ? 12 : 3}>
                        <Form.Group>
                            <Form.Label className={styles.formLabel}>
                                Precio
                            </Form.Label>
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
                    <Col lg={isLatFilter ? 12 : 3}>
                        <Form.Group>
                            <Form.Label className={styles.formLabel}>
                                Kilometraje
                            </Form.Label>
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
                <div className={`${!isLatFilter ? 'd-none d-md-block' : 'd-none'}`}>
                    <SelectedFilters {...selectedFiltersProps} />
                </div>
            </Form>

            <div className={styles.mobileActionButton}>
                <button
                    type="button"
                    className="btnGlobal w-100"
                    onClick={() => setIsFiltersVisible(false)}
                >
                    Ver Resultados
                </button>
            </div>
        </>
    );
};

export default FilterForm;
