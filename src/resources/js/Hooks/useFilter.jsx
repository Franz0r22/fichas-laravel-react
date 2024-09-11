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
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedFuel, setSelectedFuel] = useState([]);
    const [selectedLabel, setSelectedLabel] = useState([]);
    
    // Búsqueda por palabra clave
    const [keyword, setKeyword] = useState('');

    const handleFilter = useCallback((ads) => {
        return ads.filter(ad => {
            const yearMatch = ad.year >= selectedYearRange[0] && ad.year <= selectedYearRange[1];
            const priceMatch = ad.price >= selectedPriceRange[0] && ad.price <= selectedPriceRange[1];
            const KmMatch = ad.mileage >= selectedKmRange[0] && ad.mileage <= selectedKmRange[1];
            const brandMatch = selectedBrand ? ad.brand === selectedBrand : true;
            const modelMatch = selectedModel ? ad.model === selectedModel : true;
            const fuelMatch = selectedFuel.length > 0 ? selectedFuel.includes(ad.fuelType) : true;
            const labelMatch = selectedLabel.length > 0 ? selectedLabel.includes(ad.ribbonName) : true;
            const categoryMatch = selectedCategory.length > 0 ? selectedCategory.includes(ad.category) : true;
            const keywordMatch = keyword ? ad.brand.toLowerCase().includes(keyword) || ad.model.toLowerCase().includes(keyword) || ad.version.toLowerCase().includes(keyword) || ad.transmissionType.toLowerCase().includes(keyword) || ad.category.toLowerCase().includes(keyword) || ad.fuelType.toLowerCase().includes(keyword) : true;
            return yearMatch && brandMatch && modelMatch && priceMatch && fuelMatch && labelMatch && KmMatch && categoryMatch && keywordMatch;
        });
    }, [selectedYearRange, selectedBrand, selectedModel, selectedPriceRange, selectedKmRange, selectedFuel, selectedLabel, keyword, selectedCategory]);

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
        selectedCategory,
        setSelectedCategory,
        keyword,
        setKeyword,
        handleFilter,
    };
};

export default useFilter;
