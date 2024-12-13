import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar el rango de kilometraje de los vehículos.
 *
 * @param {object} data - Datos que contienen anuncios de vehículos.
 * @param {Array} data.ads - Array de anuncios de vehículos.
 *
 * @returns {object} Objeto que contiene el kilometraje mínimo, kilometraje máximo, rango de kilometraje seleccionado y la función para actualizar el rango.
 * @property {number} minKm - Kilometraje mínimo disponible basado en los datos.
 * @property {number} maxKm - Kilometraje máximo disponible basado en los datos.
 * @property {Array<number>} kmRange - Rango de kilometraje seleccionado.
 * @property {function} setKmRange - Función para actualizar el rango de kilometraje seleccionado.
 */

const useKmRange = (data) => {
    const [minKm, setMinKm] = useState(0);
    const [maxKm, setMaxKm] = useState(1000000);
    const [kmRange, setKmRange] = useState([0, 1000000]);

    useEffect(() => {
        if (data && data.ads) {
            const kms = data.ads.map(ad => ad.mileage);
            const minKm = Math.min(...kms);
            const maxKm = Math.max(...kms);
            setMinKm(minKm);
            setMaxKm(maxKm);
            setKmRange([minKm, maxKm]);
        }
    }, [data]);

    return {
        minKm,
        maxKm,
        kmRange,
        setKmRange,
    };
};

export default useKmRange;
