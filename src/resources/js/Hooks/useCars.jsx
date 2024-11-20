import { useState, useEffect, useMemo } from 'react';
import { usePage } from "@inertiajs/react";
import useFilter from './useFilter';
import usePagination from './usePagination';
import usePriceRange from './filterData/usePriceRange';
import useUniqueBrands from './filterData/useUniqueBrands';
import useUniqueModelsByBrand from './filterData/useUniqueModelsByBrand';
import useYearRange from './filterData/useYearRange';
import useUniqueFuels from './filterData/useUniqueFuels';
import useUniqueLabels from './filterData/useUniqueLabels';
import useKmRange from './filterData/useKmRange';
import useUniqueCategories from './filterData/useUniqueCategories';
import useUniqueSeller from './filterData/useUniqueSeller';

const useCars = () => {
    // Obtiene los datos y posibles errores desde el contexto de Inertia.js
    const { props: { data, error } } = usePage();

    // Usa hooks específicos para obtener datos únicos y rangos de precios
    const { minPrice, maxPrice } = usePriceRange(data);
    const { minYear, maxYear } = useYearRange(data);
    const { minKm, maxKm } = useKmRange(data);

    // Usa useFilter pasando los valores mínimos y máximos dinámicos
    const {
        selectedYearRange, setSelectedYearRange,
        selectedPriceRange, setSelectedPriceRange,
        selectedKmRange, setSelectedKmRange,
        selectedBrand, setSelectedBrand,
        selectedModel, setSelectedModel,
        selectedFuel, setSelectedFuel,
        selectedLabel, setSelectedLabel,
        selectedCategory, setSelectedCategory,
        keyword, setKeyword,
        selectedSeller, setSelectedSeller,
        handleFilter
    } = useFilter({
        minYear,
        maxYear,
        minPrice,
        maxPrice,
        minKm,
        maxKm,
    });

    // Filtra los datos usando la función handleFilter proporcionada por useFilter
    const filteredData = useMemo(() => handleFilter(data?.ads || []), [handleFilter, data]);

    const uniqueBrands = useUniqueBrands(filteredData);
    const uniqueModels = useUniqueModelsByBrand(filteredData, selectedBrand);
    const uniqueFuels = useUniqueFuels(data); // Ajusta según tus necesidades
    const uniqueLabels = useUniqueLabels(data); // Ajusta según tus necesidades
    const uniqueCategories = useUniqueCategories(data); // Ajusta según tus necesidades
    const uniqueSellers = useUniqueSeller(data); // Ajusta según tus necesidades

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

    // Efecto que actualiza el rango de años seleccionado cuando los datos o los años cambian
    useEffect(() => {
        if (data) {
            setSelectedYearRange([minYear, maxYear]);
        }
    }, [data, minYear, maxYear, setSelectedYearRange]);

    // Efecto que actualiza el rango de Kilómetros seleccionado cuando los datos o los kms cambian
    useEffect(() => {
        if (data) {
            setSelectedKmRange([minKm, maxKm]);
        }
    }, [data, minKm, maxKm, setSelectedKmRange]);

    // Efecto que limpia el modelo seleccionado cuando cambia la marca seleccionada
    useEffect(() => {
        if (selectedBrand) {
            // Restablece el modelo seleccionado cuando se cambia la marca
            setSelectedModel('');
        }
    }, [selectedBrand, setSelectedModel]);

    // Efecto que limpia la marca seleccionado cuando cambia la categoría seleccionada
    const availableBrandsForCategory = useUniqueBrands(filteredData);
    useEffect(() => {
        if (selectedCategory) {
            if (!availableBrandsForCategory.includes(selectedBrand)) {
                setSelectedBrand('');
            }
        }
    }, [selectedCategory, selectedBrand, availableBrandsForCategory, setSelectedBrand]);

    // Devuelve todos los valores y funciones necesarias para ser usados por los componentes que consumen este hook
    return {
        data,
        error,
        uniqueBrands,
        uniqueModels,
        uniqueFuels,
        uniqueLabels,
        uniqueCategories,
        uniqueSellers,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        minKm,
        maxKm,
        selectedYearRange,
        setSelectedYearRange,
        selectedKmRange,
        setSelectedKmRange,
        selectedBrand,
        setSelectedBrand,
        selectedModel,
        setSelectedModel,
        selectedPriceRange,
        setSelectedPriceRange,
        selectedFuel,
        setSelectedFuel,
        selectedLabel,
        setSelectedLabel,
        keyword,
        setKeyword,
        selectedCategory,
        setSelectedCategory,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        currentItems,
        totalPages,
        selectedSeller,
        setSelectedSeller,
    };
};

export default useCars;
