import { useCars } from "../../Contexts/CarsContext";
import styles from "./Comparator.module.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Card } from "react-bootstrap";

export const Comparator = () => {
    const { comparator } = useCars(); // No necesitamos setComparator aquí
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {comparator.length > 0 && (
                <>
                    <Button className={styles.comparator} onClick={handleShow}>
                        Comparar
                    </Button>

                    <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Comparador</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {comparator.length > 0 ? (
                                <div className={styles.comparatorList}>
                                    {comparator.map((car) => (
                                        <Card
                                            key={car.carId}
                                            className={styles.carCard}
                                        >
                                            <Card.Img
                                                variant="top"
                                                src={car.photo}
                                                className={styles.cardImg}
                                                alt={`${car.brand} ${car.model}`}
                                            />
                                            <Card.Body>
                                                <Card.Title>
                                                    {car.brand} {car.model}
                                                </Card.Title>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <p>No hay coches en el comparador.</p>
                            )}
                        </Offcanvas.Body>
                    </Offcanvas>
                </>
            )}
        </>
    );
};
