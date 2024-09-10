import { useState, useCallback } from 'react';

const useFilter = () => {
    //Filtros Rango
    const [selectedYearRange, setSelectedYearRange] = useState([1900, 2024]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1000000000]);
    const [selectedKmRange, setSelectedKmRange] = useState([0, 1000000]);

    //Filtros Select
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    //Filtros Select o Checkboxes (Depende del filtro)
    const [selectedFuel, setSelectedFuel] = useState([]);
    const [selectedLabel, setSelectedLabel] = useState([]);
    
    // Búsqueda por palabra clave
    const [keyword, setKeyword] = useState('');

    const handleFilter = useCallback((data) => {
        return data.filter(auto => {
            const yearMatch = auto.year >= selectedYearRange[0] && auto.year <= selectedYearRange[1];
            const priceMatch = auto.precio >= selectedPriceRange[0] && auto.precio <= selectedPriceRange[1];
            const KmMatch = auto.VCHKILOMETROS >= selectedKmRange[0] && auto.VCHKILOMETROS <= selectedKmRange[1];
            const brandMatch = selectedBrand ? auto.marca === selectedBrand : true;
            const modelMatch = selectedModel ? auto.modelo === selectedModel : true;
            const fuelMatch = selectedFuel.length > 0 ? selectedFuel.includes(auto.COMBUSTIBLE) : true;
            const labelMatch = selectedLabel.length > 0 ? selectedLabel.includes(auto.VCHETIQUETA_TITULO) : true;
            const keywordMatch = keyword ? auto.marca.toLowerCase().includes(keyword) || auto.modelo.toLowerCase().includes(keyword) || version.toLowerCase().includes(keyword) : true;
            return yearMatch && brandMatch && modelMatch && priceMatch && fuelMatch && labelMatch && KmMatch && keywordMatch;
        });
    }, [selectedYearRange, selectedBrand, selectedModel, selectedPriceRange, selectedKmRange, selectedFuel, selectedLabel, keyword]);

    return {
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
        handleFilter,
    };
};

export default useFilter;
