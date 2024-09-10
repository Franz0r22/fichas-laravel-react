import { useState, useEffect } from 'react';

const useUniqueModelsByBrand = (data, selectedBrand) => {
    const [uniqueModels, setUniqueModels] = useState([]);

    useEffect(() => {
        if (data && selectedBrand) {
            const models = data
                .filter(auto => auto.marca === selectedBrand)
                .map(auto => auto.modelo);
            setUniqueModels([...new Set(models)].sort());
        } else {
            setUniqueModels([]);
        }
    }, [data, selectedBrand]);

    return uniqueModels;
};

export default useUniqueModelsByBrand;
