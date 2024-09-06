import { useMemo } from 'react';

const useUniqueLabels = (data) => {
    return useMemo(() => {
        if (!data) return [];

        const filteredData = data
            .map(auto => auto.VCHETIQUETA_TITULO)
            .filter(label => label && label.trim() !== '');
        return [...new Set(filteredData)].sort();
    }, [data]);
};

export default useUniqueLabels;
