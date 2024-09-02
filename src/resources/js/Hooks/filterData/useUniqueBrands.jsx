import { useMemo } from 'react';

const useUniqueBrands = (data) => {
    return useMemo(() => {
        if (!data) return [];
        return [...new Set(data.map(auto => auto.MARCA))].sort();
    }, [data]);
};

export default useUniqueBrands;
