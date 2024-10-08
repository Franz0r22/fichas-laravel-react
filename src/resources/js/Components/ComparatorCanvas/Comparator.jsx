import { useCars } from "../../Contexts/CarsContext";
import styles from "./Comparator.module.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Card } from "react-bootstrap";
import ComparatorModal from "./ComparatorModal";
import { formatNumber } from "../../utils/formatNumber";
import { Row, Col } from "react-bootstrap";

export const Comparator = () => {
    const { comparator, setComparator } = useCars();
    const [modalShow, setModalShow] = useState(false);
    const [detailComparator, setDetailComparator] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const removeCarFromComparator = (carId) => {
        setComparator((prev) => prev.filter((car) => car.carId !== carId));
    };

    const carIds = comparator.map((car) => car.carId);

    async function getDataComparator() {
        try {
            const response = await fetch("/comparador", {
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
    }

    return (
        <>
            {comparator.length > 0 && (
                <>
                    <Button className={styles.comparator} onClick={handleShow}>
                        <span>Comparar:</span>
                        <img
                            width={20}
                            src="/images/pointer-comparador.svg"
                            alt=""
                        />

                        <div className={styles.imageContainer}>
                            {comparator.map((car, index) => (
                                <div className={styles.circleImg} key={index}>
                                    <img
                                        key={index}
                                        src={car.photo}
                                        alt={`${car.brand} ${car.model}`}
                                        className={styles.carImageBtn}
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src =
                                                "/images/placeholder-noimage.jpg";
                                        }}
                                    />
                                </div>
                            ))}
                            {Array.from({ length: 3 - comparator.length }).map(
                                (_, index) => (
                                    <div
                                        className={styles.circleImgEmpty}
                                        key={`empty-${index}`}
                                    >
                                        <div
                                            className={styles.emptyCircle}
                                        ></div>
                                    </div>
                                )
                            )}
                        </div>
                        <span>{`${comparator.length} de 3`}</span>
                    </Button>

                    <Offcanvas show={show} onHide={handleClose} placement="end">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title className={styles["title-canvas"]}>
                                Vehículos
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ComparatorModal
                                show={modalShow}
                                data={detailComparator}
                                onHide={() => setModalShow(false)}
                            ></ComparatorModal>

                            {comparator.length > 0 ? (
                                <div className={styles.comparatorList}>
                                    {comparator.map((car) => (
                                        <Card
                                            key={car.carId}
                                            className={styles.carCard}
                                        >
                                            <Row>
                                                <Col>
                                                    <Card.Img
                                                        variant="top"
                                                        src={car.photo}
                                                        onError={({
                                                            currentTarget,
                                                        }) => {
                                                            currentTarget.onerror =
                                                                null; // prevents looping
                                                            currentTarget.src =
                                                                "/images/placeholder-noimage.jpg";
                                                        }}
                                                        className={
                                                            styles.cardImg
                                                        }
                                                        alt={`${car.brand} ${car.model}`}
                                                    />
                                                </Col>
                                                <Col
                                                    className={
                                                        styles.contenidoCard
                                                    }
                                                >
                                                    <Card.Title>
                                                        {car.brand} {car.model}
                                                    </Card.Title>
                                                    <Card.Text>
                                                        Precio: $
                                                        {formatNumber(
                                                            car.price
                                                        )}
                                                    </Card.Text>
                                                </Col>
                                                <Button
                                                    className={styles.btnQuitar}
                                                    onClick={() =>
                                                        removeCarFromComparator(
                                                            car.carId
                                                        )
                                                    }
                                                >
                                                    x
                                                </Button>
                                            </Row>
                                        </Card>
                                    ))}
                                    <Button
                                        className={styles.btnCard}
                                        onClick={() => {
                                            getDataComparator();
                                        }}
                                    >
                                        Comparar ahora
                                    </Button>
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
