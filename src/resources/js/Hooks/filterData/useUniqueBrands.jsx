import { useMemo } from 'react';

const useUniqueBrands = (data) => {
    return useMemo(() => {
        if (!data) return [];
        return [...new Set(data.map(auto => auto.marca))].sort();
    }, [data]);
};

export default useUniqueBrands;
