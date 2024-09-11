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
        if (data && data.ads) {
            const years = [...new Set(data.ads.map(ad => ad.year))].sort((a, b) => b - a);
            const brands = [...new Set(data.ads.map(ad => ad.brand))].sort();
            const modelsMap = {};

            data.ads.forEach(ad => {
                if (!modelsMap[ad.brand]) {
                    modelsMap[ad.brand] = new Set();
                }
                modelsMap[ad.brand].add(ad.model);
            });

            const prices = data.ads.map(ad => ad.price);
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
        const years = [...new Set(filtered.map(ad => ad.year))].sort((a, b) => b - a);
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
        return data.ads.filter(ad => {
            const yearMatch = selectedYear ? ad.year === parseInt(selectedYear) : true;
            const brandMatch = selectedBrand ? ad.brand === selectedBrand : true;
            const modelMatch = selectedModel ? ad.model === selectedModel : true;
            const priceMatch = ad.price >= selectedPriceRange[0] && ad.price <= selectedPriceRange[1];
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
