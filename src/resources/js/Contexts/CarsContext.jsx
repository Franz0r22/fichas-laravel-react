import React, { createContext, useContext, useState, useEffect } from "react";

const CarsContext = createContext();

export const CarsProvider = ({ children }) => {
    // localStorage.clear();
    // Inicializa el estado con el valor del localStorage o un array vacío
    const [comparator, setComparator] = useState(() => {
        try {
            const savedComparator = localStorage.getItem("comparator");
            return savedComparator ? JSON.parse(savedComparator) : [];
        } catch (error) {
            console.error("Error reading from localStorage", error);
            return [];
        }
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
