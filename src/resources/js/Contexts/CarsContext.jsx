import React, { createContext, useContext, useState, useEffect } from "react";

const CarsContext = createContext();

export const CarsProvider = ({ children }) => {
    // Inicializa el estado con el valor del localStorage o un array vacío
    const [comparator, setComparator] = useState(() => {
        const savedComparator = localStorage.getItem("comparator");
        return savedComparator ? JSON.parse(savedComparator) : [];
    });

    useEffect(() => {
        // Guarda el estado en localStorage cada vez que cambia
        localStorage.setItem("comparator", JSON.stringify(comparator));
    }, [comparator]);

    return (
        <CarsContext.Provider value={{ comparator, setComparator }}>
            {children}
        </CarsContext.Provider>
    );
};

export const useCars = () => useContext(CarsContext);
