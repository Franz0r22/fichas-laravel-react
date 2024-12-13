import { useMemo } from 'react';

const useUniqueFuels = (data) => {
    return useMemo(() => {
        if (!data || (!Array.isArray(data) && !data.ads)) return [];

        const adsArray = Array.isArray(data) ? data : data.ads;
        const filteredData = adsArray
            .map(ad => ad.fuelType)
            .filter(fuel => fuel && fuel.trim() !== '');
        return [...new Set(filteredData)].sort();
    }, [data]);
};

export default useUniqueFuels;