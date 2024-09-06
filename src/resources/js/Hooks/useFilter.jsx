import { useState, useCallback } from 'react';

const useFilter = () => {
    const [selectedYearRange, setSelectedYearRange] = useState([1900, 2024]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1000000000]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedFuel, setSelectedFuel] = useState('');
    const [selectedLabel, setSelectedLabel] = useState('');

    const handleFilter = useCallback((data) => {
        return data.filter(auto => {
            const yearMatch = auto.INTANO >= selectedYearRange[0] && auto.INTANO <= selectedYearRange[1];
            const priceMatch = auto.VCHPRECIO >= selectedPriceRange[0] && auto.VCHPRECIO <= selectedPriceRange[1];
            const brandMatch = selectedBrand ? auto.MARCA === selectedBrand : true;
            const modelMatch = selectedModel ? auto.MODELO === selectedModel : true;
            const fuelMatch = selectedFuel ? auto.COMBUSTIBLE === selectedFuel: true;
            const labelMatch = selectedLabel ? auto.VCHETIQUETA_TITULO === selectedLabel: true;
            return yearMatch && brandMatch && modelMatch && priceMatch && fuelMatch && labelMatch;
        });
    }, [selectedYearRange, selectedBrand, selectedModel, selectedPriceRange, selectedFuel, selectedLabel]);

    return {
        selectedYearRange,
        setSelectedYearRange,
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
        handleFilter,
    };
};

export default useFilter;
