import { useState } from "react";
import { useCars } from "../Contexts/CarsContext";
import { getComparatorData } from "../services/comparatorService";

export const useComparator = () => {
    const { comparator, setComparator } = useCars();
    const [modalShow, setModalShow] = useState(false);
    const [detailComparator, setDetailComparator] = useState();
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const removeCarFromComparator = (carId) => {
        setComparator((prev) => prev.filter((car) => car.carId !== carId));
    };

    const clearComparator = () => {
        setComparator([]);
    };

    const getDataComparator = async () => {
        if (!comparator.length) {
            setError('No hay vehículos seleccionados para comparar');
            return;
        }

        const carIds = comparator.map((car) => car.carId);

        setIsLoading(true);
        setError(null);

        try {
            const data = await getComparatorData(carIds);
            setDetailComparator(data);
            setModalShow(true);
        } catch (error) {
            console.error("Error al obtener datos del comparador:", error.message);
            setError(error.message);
            setModalShow(false);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        comparator,
        modalShow,
        setModalShow,
        detailComparator,
        show,
        handleClose,
        handleShow,
        removeCarFromComparator,
        getDataComparator,
        clearComparator,
        error,
        isLoading,
    };
};
