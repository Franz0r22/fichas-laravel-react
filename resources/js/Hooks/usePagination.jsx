import { useState, useMemo } from 'react';

const usePagination = (filteredData, initialPageSize = 20) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const totalPages = useMemo(() => Math.ceil(filteredData.length / pageSize), [filteredData, pageSize]);

    const currentItems = useMemo(() => {
        const indexOfLastItem = currentPage * pageSize;
        const indexOfFirstItem = indexOfLastItem - pageSize;
        return filteredData.slice(indexOfFirstItem, indexOfLastItem);
    }, [filteredData, currentPage, pageSize]);

    return {
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        currentItems,
        totalPages,
    };
};

export default usePagination;
