import { useState, useCallback, useEffect } from 'react';

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
  // Parsear los parámetros de la URL
  const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      yearRange: params.get('yearRange')?.split('-').map(Number) || [minYear, maxYear],
      priceRange: params.get('priceRange')?.split('-').map(Number) || [minPrice, maxPrice],
      kmRange: params.get('kmRange')?.split('-').map(Number) || [minKm, maxKm],
      brand: params.get('brand') || '',
      model: params.get('model') || '',
      category: params.get('category')?.split(',') || [],
      fuel: params.get('fuel')?.split(',') || [],
      label: params.get('label')?.split(',') || [],
      keyword: params.get('keyword') || '',
      seller: params.get('seller')?.split(',') || [],
    };
  };

  const initialParams = getQueryParams();

  // Filtros Rango
  const [selectedYearRange, setSelectedYearRange] = useState(initialParams.yearRange);
  const [selectedPriceRange, setSelectedPriceRange] = useState(initialParams.priceRange);
  const [selectedKmRange, setSelectedKmRange] = useState(initialParams.kmRange);

  // Filtros Select
  const [selectedBrand, setSelectedBrand] = useState(initialParams.brand);
  const [selectedModel, setSelectedModel] = useState(initialParams.model);

  // Filtros Select o Checkboxes (Depende del filtro)
  const [selectedCategory, setSelectedCategory] = useState(initialParams.category);
  const [selectedFuel, setSelectedFuel] = useState(initialParams.fuel);
  const [selectedLabel, setSelectedLabel] = useState(initialParams.label);

  // Búsqueda por palabra clave
  const [keyword, setKeyword] = useState(initialParams.keyword);
  const [selectedSeller, setSelectedSeller] = useState(initialParams.seller);

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

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (selectedYearRange[0] !== minYear || selectedYearRange[1] !== maxYear) {
      queryParams.set('yearRange', selectedYearRange.join('-'));
    }

    if (selectedPriceRange[0] !== minPrice || selectedPriceRange[1] !== maxPrice) {
      queryParams.set('priceRange', selectedPriceRange.join('-'));
    }

    if (selectedKmRange[0] !== minKm || selectedKmRange[1] !== maxKm) {
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

    const search = queryParams.toString() ? `?${queryParams.toString()}` : '';
    window.history.replaceState(null, '', `${window.location.pathname}${search}`);
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
    minYear,
    maxYear,
    minPrice,
    maxPrice,
    minKm,
    maxKm,
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
