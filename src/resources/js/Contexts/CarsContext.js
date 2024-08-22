import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CarsContext = createContext();

export const CarsProvider = ({ children, initialData }) => {
    const [data, setData] = useState(initialData || []);
    const [error, setError] = useState(null);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [uniqueYears, setUniqueYears] = useState([]);
    const [uniqueBrands, setUniqueBrands] = useState([]);
    const [uniqueModels, setUniqueModels] = useState([]);
    const [modelsByBrand, setModelsByBrand] = useState({}); 
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000000);
    const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1000000000]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    useEffect(() => {
        if (data) {
            const years = [...new Set(data.map(auto => auto.INTANO))].sort((a, b) => b - a);
            const brands = [...new Set(data.map(auto => auto.MARCA))].sort();
            const modelsMap = {};

            data.forEach(auto => {
                if (!modelsMap[auto.MARCA]) {
                    modelsMap[auto.MARCA] = new Set();
                }
                modelsMap[auto.MARCA].add(auto.MODELO);
            });

            const prices = data.map(auto => auto.VCHPRECIO);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            setMinPrice(minPrice);
            setMaxPrice(maxPrice);
            setSelectedPriceRange([minPrice, maxPrice]);

            setUniqueYears(years);
            setUniqueBrands(brands);
            setModelsByBrand(modelsMap);
        }
    }, [data]);

    useEffect(() => {
        const filtered = handleFilter();
        const years = [...new Set(filtered.map(auto => auto.INTANO))].sort((a, b) => b - a);
        setUniqueYears(years);
    }, [selectedBrand, selectedModel, selectedYear, selectedPriceRange, data]);

    useEffect(() => {
        if (selectedBrand && modelsByBrand[selectedBrand]) {
            setUniqueModels([...modelsByBrand[selectedBrand]]);
        } else {
            setUniqueModels([]);
        }
    }, [selectedBrand, modelsByBrand]);

    const handleFilter = () => {
        return data.filter(auto => {
            const yearMatch = selectedYear ? auto.INTANO === parseInt(selectedYear) : true;
            const brandMatch = selectedBrand ? auto.MARCA === selectedBrand : true;
            const modelMatch = selectedModel ? auto.MODELO === selectedModel : true;
            const priceMatch = auto.VCHPRECIO >= selectedPriceRange[0] && auto.VCHPRECIO <= selectedPriceRange[1];
            return yearMatch && brandMatch && modelMatch && priceMatch;
        });
    };

    const filteredData = useMemo(() => handleFilter(), [data, selectedYear, selectedBrand, selectedModel, selectedPriceRange]);

    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / pageSize);

    return (
        <CarsContext.Provider
            value={{
                data,
                error,
                selectedYear,
                setSelectedYear,
                selectedBrand,
                setSelectedBrand,
                selectedModel,
                setSelectedModel,
                uniqueYears,
                uniqueBrands,
                uniqueModels,
                selectedPriceRange,
                setSelectedPriceRange,
                minPrice,
                maxPrice,
                currentPage,
                setCurrentPage,
                pageSize,
                setPageSize,
                currentItems,
                totalPages,
            }}
        >
            {children}
        </CarsContext.Provider>
    );
};

export const useCars = () => useContext(CarsContext);
