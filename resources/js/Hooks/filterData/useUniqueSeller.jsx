import { useMemo } from 'react';

const useUniqueSeller = (data) => {
    return useMemo(() => {
        if (!data || (!Array.isArray(data) && !data.ads)) return [];

        const adsArray = Array.isArray(data) ? data : data.ads;
        const filteredData = adsArray
            .map(ad => ad.sellerName)
            .filter(sellerName => sellerName && sellerName.trim() !== '');
        return [...new Set(filteredData)].sort();
    }, [data]);
};

export default useUniqueSeller;