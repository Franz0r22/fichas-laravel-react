import { useState } from "react";
import { useCars } from "../Contexts/CarsContext";

export const useComparator = () => {
    const { comparator, setComparator } = useCars();
    const [modalShow, setModalShow] = useState(false);
    const [detailComparator, setDetailComparator] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const removeCarFromComparator = (carId) => {
        setComparator((prev) => prev.filter((car) => car.carId !== carId));
    };

    const clearComparator = () => {
        setComparator([]);
    };

    const getDataComparator = async () => {
        const carIds = comparator.map((car) => car.carId);
        try {
            const response = await fetch(route("comparador"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
                body: JSON.stringify({ carIds }),
            });
            if (!response.ok) {
                throw new Error("Error fetching comparador data");
            }
            const data = await response.json();
            setDetailComparator(data);
            setModalShow(true);
        } catch (error) {
            console.error("Fetch error:", error);
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
    };
};

