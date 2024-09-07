import { useState, useMemo } from "react";

const useSort = (items) => {
    const [sortCriteria, setSortCriteria] = useState("");

    const sortedItems = useMemo(() => {
        if (!items) return [];

        const sorted = [...items].sort((a, b) => {
            if (sortCriteria === "asc") {
                return a.VCHPRECIO - b.VCHPRECIO;
            } else if (sortCriteria === "desc") {
                return b.VCHPRECIO - a.VCHPRECIO;
            } else if (sortCriteria === "newest") {
                return b.AUTOID - a.AUTOID;
            } else if (sortCriteria === "oldest") {
                return a.AUTOID - b.AUTOID;
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
