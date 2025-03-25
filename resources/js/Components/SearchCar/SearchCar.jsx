import React, { useEffect, useMemo, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import styles from './SearchCar.module.css';
import { Row, Container, Col } from 'react-bootstrap';

const SearchCar = ({ uniqueCategories, data }) => {
    const { url } = usePage();
    const params = new URLSearchParams(url.split('?')[1]);
    console.log("URL:", url);

    // Estados inicializados desde la URL si existen
    const [selectedCategory, setSelectedCategory] = useState(params.get('category') || '');
    const [selectedBrand, setSelectedBrand] = useState(params.get('brand') || '');
    const [selectedModel, setSelectedModel] = useState(params.get('model') || '');
    const [selectedYearFrom, setSelectedYearFrom] = useState(params.get('yearFrom') || '');
    
    // Estado para el rango de precios (igual que en Autos.jsx)
    const [selectedPriceRange, setSelectedPriceRange] = useState(
        params.get('priceRange')?.split('-').map(Number) || []
    );

    // Calcular min/max para precios y años
    const { minPrice, maxPrice } = useMemo(() => {
        if (!data?.ads || data.ads.length === 0) return { minPrice: 0, maxPrice: 100000000 };
        const prices = data.ads.map(car => car.price);
        return {
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices)
        };
    }, [data?.ads]);

    const { minYear, maxYear } = useMemo(() => {
        if (!data?.ads || data.ads.length === 0) return { minYear: 2000, maxYear: new Date().getFullYear() };
        const years = data.ads.map(car => car.year);
        return {
            minYear: Math.min(...years),
            maxYear: Math.max(...years)
        };
    }, [data?.ads]);

    // Obtener categorías únicas
    const availableCategories = useMemo(() => {
        if (!data?.ads) return [];
        return [...new Set(data.ads.map(car => car.category))].sort();
    }, [data]);
    

    // Obtener marcas basadas en la categoría seleccionada
    const availableBrands = useMemo(() => {
        if (!data?.ads) return [];
        let filteredCars = selectedCategory 
            ? data.ads.filter(car => car.category === selectedCategory) 
            : data.ads;
        return [...new Set(filteredCars.map(car => car.brand))].sort();
    }, [data, selectedCategory]);

    // Filtrar modelos basados en la marca y categoría seleccionadas
    const availableModels = useMemo(() => {
        if (!selectedBrand || !data?.ads) return [];
        let filteredCars = data.ads.filter(car => car.brand === selectedBrand);
        if (selectedCategory) {
            filteredCars = filteredCars.filter(car => car.category === selectedCategory);
        }
        return [...new Set(filteredCars.map(car => car.model))].sort();
    }, [selectedBrand, selectedCategory, data]);

    // Obtener años disponibles basados en los filtros
    const availableYears = useMemo(() => {
        if (!data?.ads) return [];
        
        let filteredCars = data.ads;
        if (selectedBrand) filteredCars = filteredCars.filter(car => car.brand === selectedBrand);
        if (selectedModel) filteredCars = filteredCars.filter(car => car.model === selectedModel);
        
        return [...new Set(filteredCars.map(car => car.year))].sort((a, b) => a - b);
    }, [data, selectedBrand, selectedModel]);

    // Generar rangos de precios (incrementos de 5 millones - igual que en FilterForm)
    const priceRanges = useMemo(() => {
        if (!minPrice || !maxPrice) return [];
        
        const step = 5000000; // Incremento de 5 millones
        const ranges = [];
        
        for (let i = minPrice; i < maxPrice; i += step) {
            let rangeMin = i;
            let rangeMax = Math.min(i + step, maxPrice);
            ranges.push({
                id: `${rangeMin}-${rangeMax}`,
                name: `$${rangeMin.toLocaleString()} - $${rangeMax.toLocaleString()}`,
                value: [rangeMin, rangeMax]
            });
        }

        // Asegurar que el último rango llegue hasta maxPrice
        if (ranges.length === 0 || ranges[ranges.length-1].value[1] < maxPrice) {
            ranges.push({
                id: `${minPrice}-${maxPrice}`,
                name: `$${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()}`,
                value: [minPrice, maxPrice]
            });
        }

        return ranges;
    }, [minPrice, maxPrice]);

    // Resetear modelos cuando cambia la marca
    useEffect(() => {
        setSelectedModel('');
    }, [selectedBrand]);

    // Resetear marcas y modelos cuando cambia la categoría
    useEffect(() => {
        setSelectedBrand('');
        setSelectedModel('');
    }, [selectedCategory]);

    const [selectedYearRange, setSelectedYearRange] = useState(
        params.get('yearRange')?.split('-').map(Number) || []
    );
    
    const handleSearch = (e) => {
        e.preventDefault();
        
        const queryParams = {};
    
        if (selectedCategory) queryParams.category = selectedCategory;
        if (selectedBrand) queryParams.brand = selectedBrand;
        if (selectedModel) queryParams.model = selectedModel;
        
        if (selectedYearFrom) {
            queryParams.yearRange = `${selectedYearFrom}-${new Date().getFullYear()}`;
        }
        
        if (selectedPriceRange.length === 2) {
            queryParams.priceRange = `${selectedPriceRange[0]}-${selectedPriceRange[1]}`;
        }
    
        // Usar replace: true para evitar acumulación en el historial
        router.get(route('cars'), queryParams, {
            preserveState: true,
            replace: true,
            only: ['ads', 'filters'] // Especificar qué datos queremos actualizar
        });
    };
    
    
    console.log("DATA RECIBIDA EN SearchCar:", data);

    return (
        <Container fluid style={{ backgroundColor: '#282828'}}>
            <Container>
                <form onSubmit={handleSearch}>
                    <Row className={`${styles.searchContainer} d-flex justify-content-center text-center position-relative`}>
                        <Col md={12} className='d-flex justify-content-center'>
                            <div className={` ${styles.searchTitle} spacing `}>
                                Busca tu auto
                            </div>
                        </Col>
                        <Col md={12}>
                            <Row className="gx-2">
                                <Col md className='mb-3 mb-lg-0'>
                                    <select 
                                        value={selectedCategory} 
                                        onChange={e => setSelectedCategory(e.target.value)} 
                                        className={styles.searchSelect}
                                    >
                                        <option value="">Categoría</option>
                                        {availableCategories?.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </Col>
                                <Col md className='mb-3 mb-lg-0'>
                                    <select 
                                        value={selectedBrand} 
                                        onChange={e => setSelectedBrand(e.target.value)} 
                                        className={styles.searchSelect}
                                    >
                                        <option value="">Marca</option>
                                        {availableBrands?.map(brand => (
                                            <option key={brand} value={brand}>{brand}</option>
                                        ))}
                                    </select>
                                </Col>
                                <Col md className='mb-3 mb-lg-0'>
                                    <select 
                                        value={selectedModel} 
                                        onChange={e => setSelectedModel(e.target.value)} 
                                        className={styles.searchSelect} 
                                        disabled={!selectedBrand}
                                    >
                                        <option value="">{selectedBrand ? "Seleccione un modelo" : "Modelo"}</option>
                                        {availableModels?.map(model => (
                                            <option key={model} value={model}>{model}</option>
                                        ))}
                                    </select>
                                </Col>
                                {/* <Col md className='mb-3 mb-lg-0'>
                                    <select
                                        value={selectedYearFrom}
                                        onChange={(e) => setSelectedYearFrom(e.target.value)}
                                        className={styles.searchSelect}
                                    >
                                        <option value="">Año Desde</option>
                                        {availableYears.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </Col> */}
                                <Col md className='mb-3 mb-lg-0'>
                                    <select
                                        value={selectedPriceRange.length === 2 ? 
                                            `${selectedPriceRange[0]}-${selectedPriceRange[1]}` : ''}
                                        onChange={(e) => {
                                            const [min, max] = e.target.value.split('-').map(Number);
                                            setSelectedPriceRange([min, max]);
                                        }}
                                        className={styles.searchSelect}
                                    >
                                        <option value="">Rango de precios</option>
                                        {priceRanges.map((range) => (
                                            <option key={range.id} value={range.id}>
                                                {range.name}
                                            </option>
                                        ))}
                                    </select>
                                </Col>
                                <Col md="auto" className="d-flex justify-content-end">
                                    <button type="submit" className={styles.searchButton}>BUSCAR</button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </form>
            </Container>
        </Container>
    );
};

export default SearchCar;