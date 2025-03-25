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
            const calculatedMinYear = Math.min(...years);
            const calculatedMaxYear = Math.max(...years);

            // Solo actualiza si los valores calculados son diferentes
            if (calculatedMinYear !== minYear || calculatedMaxYear !== maxYear) {
                setMinYear(calculatedMinYear);
                setMaxYear(calculatedMaxYear);

                // Solo actualiza yearRange si no fue configurado desde la URL
                if (yearRange[0] === 1900 && yearRange[1] === 2024) {
                    setYearRange([calculatedMinYear, calculatedMaxYear]);
                }
            }
        }
    }, [data, minYear, maxYear, yearRange]);

    return {
        minYear,
        maxYear,
        yearRange,
        setYearRange,
    };
};

export default useYearRange;