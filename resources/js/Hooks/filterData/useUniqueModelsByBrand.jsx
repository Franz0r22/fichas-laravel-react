import { useState, useEffect } from 'react';

const useUniqueModelsByBrand = (data, selectedBrand) => {
    const [uniqueModels, setUniqueModels] = useState([]);

    useEffect(() => {
        if (data && selectedBrand) {
            const adsArray = Array.isArray(data) ? data : (data.ads || []);
            const models = adsArray
                .filter(ad => ad.brand === selectedBrand)
                .map(ad => ad.model);
            setUniqueModels([...new Set(models)].sort());
        } else {
            setUniqueModels([]);
        }
    }, [data, selectedBrand]);

    return uniqueModels;
};

export default useUniqueModelsByBrand;
