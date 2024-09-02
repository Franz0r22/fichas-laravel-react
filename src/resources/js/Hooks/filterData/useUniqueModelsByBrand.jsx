import { useState, useEffect } from 'react';

const useUniqueModelsByBrand = (data, selectedBrand) => {
    const [uniqueModels, setUniqueModels] = useState([]);

    useEffect(() => {
        if (data && selectedBrand) {
            const models = data
                .filter(auto => auto.MARCA === selectedBrand)
                .map(auto => auto.MODELO);
            setUniqueModels([...new Set(models)].sort());
        } else {
            setUniqueModels([]);
        }
    }, [data, selectedBrand]);

    return uniqueModels;
};

export default useUniqueModelsByBrand;
