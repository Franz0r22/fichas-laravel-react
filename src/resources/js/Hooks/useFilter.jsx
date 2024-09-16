import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Hook para manejar filtros de vehículos.
 *
 * @param {object} options - Opciones para configurar los filtros.
 * @param {number} options.minYear - Año mínimo disponible.
 * @param {number} options.maxYear - Año máximo disponible.
 * @param {number} options.minPrice - Precio mínimo disponible.
 * @param {number} options.maxPrice - Precio máximo disponible.
 * @param {number} options.minKm - Kilometraje mínimo disponible.
 * @param {number} options.maxKm - Kilometraje máximo disponible.
 *
 * @returns {object} Estados y funciones para manejar los filtros.
 */
const useFilter = ({
    minYear,
    maxYear,
    minPrice,
    maxPrice,
    minKm,
    maxKm,
}) => {
    // Filtros Rango
    const [selectedYearRange, setSelectedYearRange] = useState([minYear, maxYear]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([minPrice, maxPrice]);
    const [selectedKmRange, setSelectedKmRange] = useState([minKm, maxKm]);

    // Filtros Select
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    // Filtros Select o Checkboxes (Depende del filtro)
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedFuel, setSelectedFuel] = useState([]);
    const [selectedLabel, setSelectedLabel] = useState([]);
    
    // Búsqueda por palabra clave
    const [keyword, setKeyword] = useState('');

    // Añadir estado para sellerName
    const [selectedSeller, setSelectedSeller] = useState([]);

    const navigate = useNavigate();  // Hook para navegar entre rutas
    const location = useLocation();  // Hook para obtener la ubicación actual

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
            const keywordMatch = keyword ? 
                ad.brand.toLowerCase().includes(keyword.toLowerCase()) || 
                ad.model.toLowerCase().includes(keyword.toLowerCase()) || 
                ad.version.toLowerCase().includes(keyword.toLowerCase()) || 
                ad.transmissionType.toLowerCase().includes(keyword.toLowerCase()) || 
                ad.category.toLowerCase().includes(keyword.toLowerCase()) || 
                ad.fuelType.toLowerCase().includes(keyword.toLowerCase()) 
                : true;
            const sellerMatch = selectedSeller.length > 0 ? selectedSeller.includes(ad.sellerName) : true;
            return yearMatch && brandMatch && modelMatch && priceMatch && fuelMatch && labelMatch && KmMatch && categoryMatch && keywordMatch && sellerMatch;
        });
    }, [
        selectedYearRange, 
        selectedBrand, 
        selectedModel, 
        selectedPriceRange, 
        selectedKmRange, 
        selectedFuel, 
        selectedLabel, 
        keyword, 
        selectedCategory, 
        selectedSeller
    ]);

    // Actualiza la URL con los filtros solo si han cambiado
    useEffect(() => {


        const queryParams = new URLSearchParams();

        // Solo se agregan filtros que no están en su valor predeterminado
        if (selectedYearRange[0] !== minYear && selectedYearRange[0] !== 1900 || selectedYearRange[1] !== maxYear && selectedYearRange[1] !== 2024) {
            queryParams.set('yearRange', selectedYearRange.join('-'));
        }

        if (selectedPriceRange[0] !== minPrice && selectedPriceRange[0] !== 0 || selectedPriceRange[1] !== maxPrice && selectedPriceRange[1] !== 1000000000) {
            queryParams.set('priceRange', selectedPriceRange.join('-'));
        }

        if (selectedKmRange[0] !== minKm && selectedKmRange[0] !== 0 || selectedKmRange[1] !== maxKm && selectedKmRange[1] !== 1000000) {
            queryParams.set('kmRange', selectedKmRange.join('-'));
        }

        if (selectedBrand) {
            queryParams.set('brand', selectedBrand);
        }

        if (selectedModel) {
            queryParams.set('model', selectedModel);
        }

        if (selectedCategory.length > 0) {
            queryParams.set('category', selectedCategory.join(','));
        }

        if (selectedFuel.length > 0) {
            queryParams.set('fuel', selectedFuel.join(','));
        }

        if (selectedLabel.length > 0) {
            queryParams.set('label', selectedLabel.join(','));
        }

        if (keyword) {
            queryParams.set('keyword', keyword);
        }

        if (selectedSeller.length > 0) {
            queryParams.set('seller', selectedSeller.join(','));
        }

        // Si no hay filtros activos, mantener la ruta sin query params
        const search = queryParams.toString() ? `?${queryParams.toString()}` : '';

        navigate({
            pathname: location.pathname,
            search,
        }, { replace: true }); // Usar replace para evitar agregar al historial de navegación
    }, [
        selectedYearRange,
        selectedPriceRange,
        selectedKmRange,
        selectedBrand,
        selectedModel,
        selectedCategory,
        selectedFuel,
        selectedLabel,
        keyword,
        selectedSeller,
        navigate,
        location.pathname,
        minYear,
        maxYear,
        minPrice,
        maxPrice,
        minKm,
        maxKm
    ]);

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
        selectedSeller,
        setSelectedSeller,
        handleFilter,
    };
};

export default useFilter;
