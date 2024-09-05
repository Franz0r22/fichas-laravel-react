import { useMemo } from 'react';

const useUniqueFuels = (data) => {
    return useMemo(() => {
        if (!data) return [];
        return [...new Set(data.map(auto => auto.COMBUSTIBLE))].sort((a, b) => b - a);
    }, [data]);
};

export default useUniqueFuels;
