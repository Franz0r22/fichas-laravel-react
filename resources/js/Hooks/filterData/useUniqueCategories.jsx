import { useMemo } from 'react';

const useUniqueCategories = (data) => {
    return useMemo(() => {
        if (!data || (!Array.isArray(data) && !data.ads)) return [];

        const adsArray = Array.isArray(data) ? data : data.ads;
        const filteredData = adsArray
            .map(ad => ad.category)
            .filter(category => category && category.trim() !== '');
        return [...new Set(filteredData)].sort();
    }, [data]);
};

export default useUniqueCategories;