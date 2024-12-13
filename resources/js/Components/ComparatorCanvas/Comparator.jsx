import { useComparator } from "../../Hooks/useComparator";
import styles from "./Comparator.module.css";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Card } from "react-bootstrap";
import ComparatorModal from "./ComparatorModal";
import { formatNumber } from "../../utils/formatNumber";
import { Row, Col } from "react-bootstrap";
import pointer from "@images/pointer-comparador.svg"
import placeholderNoImage from '@images/placeholder-noimage.jpg';

export const Comparator = () => {
    const {
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
        isLoading,
        error,
    } = useComparator();

    return (
        <>
            {comparator.length > 0 && (
                <>
                    <Button className={styles.comparator} onClick={handleShow}>
                        <span>Comparar:</span>
                        <img
                            width={20}
                            src={pointer}
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
                                            currentTarget.onerror = null;
                                            currentTarget.src =
                                                placeholderNoImage;
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
                                handleClose={handleClose}
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
                                                            currentTarget.onerror = null;
                                                            currentTarget.src =`../../images/placeholder-noimage.jpg`
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
                                        onClick={clearComparator}
                                    >
                                        Borrar todos
                                    </Button>
                                    <Button
                                        className={styles.btnCard}
                                        onClick={getDataComparator}
                                        disabled={isLoading || comparator.length == 1}
                                    >
                                        {isLoading ? "Comparando..." : "Comparar ahora"}
                                    </Button>
                                    {error && <p className={styles.error}>{error}</p>}
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
