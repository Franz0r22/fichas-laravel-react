import { useMemo } from 'react';

const useUniqueFuels = (data) => {
    return useMemo(() => {
        if (!data) return [];

        const filteredData = data
            .map(auto => auto.COMBUSTIBLE)
            .filter(fuel => fuel && fuel.trim() !== '');
        return [...new Set(filteredData)].sort();
    }, [data]);
};

export default useUniqueFuels;