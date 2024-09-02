import { useState, useCallback } from 'react';

const useFilter = () => {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1000000000]);

    const handleFilter = useCallback((data) => {
        return data.filter(auto => {
            const yearMatch = selectedYear ? auto.INTANO === parseInt(selectedYear) : true;
            const brandMatch = selectedBrand ? auto.MARCA === selectedBrand : true;
            const modelMatch = selectedModel ? auto.MODELO === selectedModel : true;
            const priceMatch = auto.VCHPRECIO >= selectedPriceRange[0] && auto.VCHPRECIO <= selectedPriceRange[1];
            return yearMatch && brandMatch && modelMatch && priceMatch;
        });
    }, [selectedYear, selectedBrand, selectedModel, selectedPriceRange]);

    return {
        selectedYear,
        setSelectedYear,
        selectedBrand,
        setSelectedBrand,
        selectedModel,
        setSelectedModel,
        selectedPriceRange,
        setSelectedPriceRange,
        handleFilter,
    };
};

export default useFilter;
