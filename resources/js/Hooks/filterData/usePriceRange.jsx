import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar el rango de precios de los vehículos.
 *
 * @param {object} data - Datos que contienen anuncios de vehículos.
 * @param {Array} data.ads - Array de anuncios de vehículos.
 *
 * @returns {object} Objeto que contiene el precio mínimo, precio máximo, rango de precios seleccionado y la función para actualizar el rango.
 * @property {number} minPrice - Precio mínimo disponible basado en los datos.
 * @property {number} maxPrice - Precio máximo disponible basado en los datos.
 * @property {Array<number>} priceRange - Rango de precios seleccionado.
 * @property {function} setPriceRange - Función para actualizar el rango de precios seleccionado.
 */

const usePriceRange = (data) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000000);
    const [priceRange, setPriceRange] = useState([0, 1000000000]);

    useEffect(() => {
        if (data && data.ads) {
            const prices = data.ads.map(ad => ad.price);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            setMinPrice(minPrice);
            setMaxPrice(maxPrice);
            setPriceRange([minPrice, maxPrice]);
        }
    }, [data]);

    return {
        minPrice,
        maxPrice,
        priceRange,
        setPriceRange,
    };
};

export default usePriceRange;
