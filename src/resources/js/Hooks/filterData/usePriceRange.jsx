import { useState, useEffect } from 'react';

const usePriceRange = (data) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000000);
    const [priceRange, setPriceRange] = useState([0, 1000000000]);

    useEffect(() => {
        if (data) {
            const prices = data.map(auto => auto.precio);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            setMinPrice(minPrice);
            setMaxPrice(maxPrice);
            setPriceRange([minPrice, maxPrice]);
        }
    }, [data]);

    return {
        minPrice,
        maxPrice,
        priceRange,
        setPriceRange,
    };
};

export default usePriceRange;
