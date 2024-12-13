import { useMemo } from 'react';

const useUniqueBrands = (ads) => {
    return useMemo(() => {
        if (!ads || !Array.isArray(ads)) return [];
        return [...new Set(ads.map(ad => ad.brand))].sort();
    }, [ads]);
};

export default useUniqueBrands;
