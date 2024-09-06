import { useState, useEffect } from 'react';

const useYearRange = (data) => {
    const [minYear, setMinYear] = useState(1900);
    const [maxYear, setMaxYear] = useState(2024);
    const [yearRange, setYearRange] = useState([1900, 2024]);

    useEffect(() => {
        if (data) {
            const years = data.map(auto => auto.INTANO);
            const minYear = Math.min(...years);
            const maxYear = Math.max(...years);
            setMinYear(minYear);
            setMaxYear(maxYear);
            setYearRange([minYear, maxYear]);
        }
    }, [data]);

    return {
        minYear,
        maxYear,
        yearRange,
        setYearRange,
    };
};

export default useYearRange;

