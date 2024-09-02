import { useState, useEffect, useMemo } from 'react';
import { usePage } from "@inertiajs/react";
import useFilter from './useFilter';
import usePagination from './usePagination';
import usePriceRange from './filterData/usePriceRange';
import useUniqueBrands from './filterData/useUniqueBrands';
import useUniqueModelsByBrand from './filterData/useUniqueModelsByBrand';
import useUniqueYears from './filterData/useUniqueYears';

const useCars = () => {
    // Obtiene los datos y posibles errores desde el contexto de Inertia.js
    const { props: { data, error } } = usePage();
    
    // Usa el hook useFilter para manejar los filtros y el estado de los filtros
    const { 
        selectedYear, setSelectedYear, 
        selectedBrand, setSelectedBrand, 
        selectedModel, setSelectedModel, 
        selectedPriceRange, setSelectedPriceRange,
        handleFilter
    } = useFilter();
    
    // Filtra los datos usando la función handleFilter proporcionada por useFilter
    const filteredData = useMemo(() => handleFilter(data || []), [handleFilter, data]);

    // Usa hooks específicos para obtener datos únicos y rangos de precios
    const { minPrice, maxPrice } = usePriceRange(data);
    const uniqueBrands = useUniqueBrands(data);
    const uniqueModels = useUniqueModelsByBrand(data, selectedBrand);
    const uniqueYears = useUniqueYears(filteredData);

    // Usa el hook usePagination para manejar la lógica de paginación
    const {
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        currentItems,
        totalPages,
    } = usePagination(filteredData);

    // Efecto que actualiza el rango de precios seleccionado cuando los datos o los precios cambian
    useEffect(() => {
        if (data) {
            setSelectedPriceRange([minPrice, maxPrice]);
        }
    }, [data, minPrice, maxPrice, setSelectedPriceRange]);

    // Efecto que limpia el modelo seleccionado cuando cambia la marca seleccionada
    useEffect(() => {
        if (selectedBrand) {
            // Restablece el modelo seleccionado cuando se cambia la marca
            setSelectedModel('');
        }
    }, [selectedBrand]);

    // Devuelve todos los valores y funciones necesarias para ser usados por los componentes que consumen este hook
    return {
        data,
        error,
        uniqueYears,
        uniqueBrands,
        uniqueModels,
        minPrice,
        maxPrice,
        selectedYear,
        setSelectedYear,
        selectedBrand,
        setSelectedBrand,
        selectedModel,
        setSelectedModel,
        selectedPriceRange,
        setSelectedPriceRange,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        currentItems,
        totalPages,
    };
};

export default useCars;
