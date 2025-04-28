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
    const { props: { data, error } } = usePage();

    const { minPrice, maxPrice } = usePriceRange(data);
    const { minYear, maxYear } = useYearRange(data);
    const { minKm, maxKm } = useKmRange(data);

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

    const safeKeyword = keyword?.toLowerCase() || "";

    const filteredData = useMemo(() => {
        return handleFilter(data?.ads || []).filter(car =>
            (car.name ?? "").toLowerCase().includes(safeKeyword)
        );
    }, [handleFilter, data, keyword]);

    const uniqueBrands = useUniqueBrands(filteredData);
    const uniqueModels = useUniqueModelsByBrand(filteredData, selectedBrand);
    const uniqueFuels = useUniqueFuels(data);
    const uniqueLabels = useUniqueLabels(data);
    const uniqueCategories = useUniqueCategories(data);
    const uniqueSellers = useUniqueSeller(data);

    const {
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        currentItems,
        totalPages,
    } = usePagination(filteredData);

    // Función para verificar si hay parámetros en la URL
    const hasSearchParams = () => {
        const params = new URLSearchParams(window.location.search);
        return Array.from(params.keys()).length > 0; // Devuelve true si hay parámetros
    };

    // Efecto que actualiza el rango de precios seleccionado cuando los datos o los precios cambian
    useEffect(() => {
        if (data && !window.location.search.includes('priceRange')) {
            setSelectedPriceRange([minPrice, maxPrice]);
        }
    }, [data, minPrice, maxPrice, setSelectedPriceRange]);

    // Para el rango de años
    useEffect(() => {
        if (data && !window.location.search.includes('yearRange')) {
            setSelectedYearRange([minYear, maxYear]);
        }
    }, [data, minYear, maxYear, setSelectedYearRange]);

    // Para el rango de kilómetros
    useEffect(() => {
        if (data && !window.location.search.includes('kmRange')) {
            setSelectedKmRange([minKm, maxKm]);
        }
    }, [data, minKm, maxKm, setSelectedKmRange]);

    // Efecto que limpia el modelo seleccionado cuando cambia la marca seleccionada
    useEffect(() => {
        if (!hasSearchParams() && selectedBrand) {
            setSelectedModel('');
        }
    }, [selectedBrand, setSelectedModel]);

    // Efecto que limpia la marca seleccionada cuando cambia la categoría seleccionada
    const availableBrandsForCategory = useUniqueBrands(filteredData);
    useEffect(() => {
        if (!hasSearchParams() && selectedCategory) {
            if (!availableBrandsForCategory.includes(selectedBrand)) {
                setSelectedBrand('');
            }
        }
    }, [selectedCategory, selectedBrand, availableBrandsForCategory, setSelectedBrand]);

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