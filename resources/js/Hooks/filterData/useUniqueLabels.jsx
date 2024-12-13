import { useMemo } from 'react';

const useUniqueLabels = (data) => {
    return useMemo(() => {
        if (!data || (!Array.isArray(data) && !data.ads)) return [];

        const adsArray = Array.isArray(data) ? data : data.ads;
        const filteredData = adsArray
            .map(ad => ad.ribbonName)
            .filter(label => label && label.trim() !== '');
        return [...new Set(filteredData)].sort();
    }, [data]);
};

export default useUniqueLabels;
