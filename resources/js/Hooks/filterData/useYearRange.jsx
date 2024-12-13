import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar el rango de años de los vehículos.
 *
 * @param {object} data - Datos que contienen anuncios de vehículos.
 * @param {Array} data.ads - Array de anuncios de vehículos.
 *
 * @returns {object} Objeto que contiene el año mínimo, año máximo, rango de años seleccionado y la función para actualizar el rango.
 * @property {number} minYear - Año mínimo disponible basado en los datos.
 * @property {number} maxYear - Año máximo disponible basado en los datos.
 * @property {Array<number>} yearRange - Rango de años seleccionado.
 * @property {function} setYearRange - Función para actualizar el rango de años seleccionado.
 */

const useYearRange = (data) => {
    const [minYear, setMinYear] = useState(1900);
    const [maxYear, setMaxYear] = useState(2024);
    const [yearRange, setYearRange] = useState([1900, 2024]);

    useEffect(() => {
        if (data && data.ads) {
            const years = data.ads.map(ad => ad.year);
            const minYear = Math.min(...years);
            const maxYear = Math.max(...years);
            setMinYear(minYear);
            setMaxYear(maxYear);
            setYearRange([minYear, maxYear]);
        }
    }, [data]);

    return {
        minYear,
        maxYear,
        yearRange,
        setYearRange,
    };
};

export default useYearRange;

