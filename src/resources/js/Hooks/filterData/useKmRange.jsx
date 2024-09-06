import { useState, useEffect } from 'react';

const useKmRange = (data) => {
    const [minKm, setMinKm] = useState(0);
    const [maxKm, setMaxKm] = useState(1000000);
    const [kmRange, setKmRange] = useState([0, 1000000]);

    useEffect(() => {
        if (data) {
            const kms = data.map(auto => auto.VCHKILOMETROS);
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
