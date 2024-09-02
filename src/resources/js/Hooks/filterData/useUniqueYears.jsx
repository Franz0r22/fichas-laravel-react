import { useMemo } from 'react';

const useUniqueYears = (data) => {
    return useMemo(() => {
        if (!data) return [];
        return [...new Set(data.map(auto => auto.INTANO))].sort((a, b) => b - a);
    }, [data]);
};

export default useUniqueYears;
