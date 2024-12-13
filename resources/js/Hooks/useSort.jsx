import { useState, useMemo } from "react";

const useSort = (items) => {
    const [sortCriteria, setSortCriteria] = useState("newest");

    const sortedItems = useMemo(() => {
        if (!items) return [];

        const sorted = [...items].sort((a, b) => {
            if (sortCriteria === "desc") {
                return b.price - a.price;
            } else if (sortCriteria === "asc") {
                return a.price - b.price;
            } else if (sortCriteria === "newest") {
                return b.carId - a.carId;
            } else if (sortCriteria === "oldest") {
                return a.carId - b.carId;
            }
            return 0;
        });

        return sorted;
    }, [items, sortCriteria]);

    return {
        sortedItems,
        sortCriteria,
        setSortCriteria
    };
};

export default useSort;
