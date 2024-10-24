import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Card, Carousel } from "react-bootstrap";
import styles from "./ComparatorModal.module.css";
import { transmissionString } from "../../utils/transmissionString";
import { formatNumber } from "../../utils/formatNumber";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const ComparatorModal = (props) => {
    const { show, data } = props;

    if (!data) {
        return (
            <Modal {...props} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Comparador</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {data
                            ? "No hay datos para mostrar."
                            : "Cargando datos..."}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    console.log("test data", data);

    const minPrice = Math.min(...data.data.map((car) => car.price));
    const maxPrice = Math.max(...data.data.map((car) => car.price));
    const minYear = Math.min(...data.data.map((car) => car.year));
    const maxYear = Math.max(...data.data.map((car) => car.year));
    const minKilometers = Math.min(...data.data.map((car) => car.kilometers));
    const maxKilometers = Math.max(...data.data.map((car) => car.kilometers));
    const minAirbag = Math.min(...data.data.map((car) => car.airbag || 0));
    const maxAirbag = Math.max(...data.data.map((car) => car.airbag || 0));
    const minHp = Math.min(...data.data.map((car) => car.hp || 0));
    const maxHp = Math.max(...data.data.map((car) => car.hp || 0));

    const carsWithClasses = data.data.map((car) => {
        const priceClass =
            car.price === minPrice
                ? styles.green
                : car.price === maxPrice
                ? styles.red
                : "";
        const yearClass =
            car.year === maxYear
                ? styles.green
                : car.year === minYear
                ? styles.red
                : "";
        const kilometersClass =
            car.kilometers === minKilometers
                ? styles.green
                : car.kilometers === maxKilometers
                ? styles.red
                : "";
        const airbagClass =
            car.airbag === maxAirbag
                ? styles.green
                : car.airbag === minAirbag
                ? styles.red
                : "";
        const hpClass =
            car.hp === maxHp
                ? styles.green
                : car.hp === minHp
                ? styles.red
                : "";

        return {
            ...car,
            priceClass,
            yearClass,
            kilometersClass,
            airbagClass,
            hpClass,
        };
    });

    return (
        <Modal {...props} size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-center">Comparador</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Swiper con navegación y paginación */}
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        991: {
                            slidesPerView: 2,
                        },
                        1200: {
                            slidesPerView: 3,
                        },
                    }}
                    navigation
                    pagination={{ clickable: true }} // Paginación habilitada
                    modules={[Navigation]} // Módulos de navegación y paginación
                >
                    {carsWithClasses.map((car, index) => (
                        <SwiperSlide key={index}>
                            <Card className={styles.cardComparador}>
                                <img
                                    className={styles.logo}
                                    src={car.brandLogoURL}
                                    alt="Logo"
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src =
                                            "/images/placeholder-noimage.jpg";
                                    }}
                                />
                                <Carousel fade interval={null}>
                                    {car.photos.map((photo, index) => {
                                        if (index <= 2) {
                                            return (
                                                <Carousel.Item key={index}>
                                                    <Card.Img
                                                        variant="top"
                                                        src={photo}
                                                        alt="Foto del coche"
                                                        onError={({
                                                            currentTarget,
                                                        }) => {
                                                            currentTarget.onerror =
                                                                null; // Previene un bucle infinito si la imagen de reemplazo también falla
                                                            currentTarget.src =
                                                                "/images/placeholder-noimage.jpg"; // Imagen de reserva
                                                        }}
                                                    />
                                                </Carousel.Item>
                                            );
                                        }
                                        return null;
                                    })}
                                </Carousel>
                                <Card.Body className={styles.bodyCard}>
                                    <Card.Title className={styles.brand}>
                                        {car.brandName} {car.modelName}
                                    </Card.Title>
                                    <div className={styles.version}>
                                        {car.version}
                                    </div>
                                    <div>
                                        <div
                                            className={`${styles.desc} ${styles.odd}`}
                                        >
                                            <span className={styles["fw-500"]}>
                                                Precio:
                                            </span>
                                            <span className={car.priceClass}>
                                                {car.currency +
                                                    formatNumber(car.price)}
                                            </span>
                                        </div>
                                        <div
                                            className={`${styles.desc} ${styles.even}`}
                                        >
                                            <span className={styles["fw-500"]}>
                                                Año:
                                            </span>
                                            <span className={car.yearClass}>
                                                {car.year}
                                            </span>
                                        </div>
                                        <div
                                            className={`${styles.desc} ${styles.odd}`}
                                        >
                                            <span className={styles["fw-500"]}>
                                                Kilometros:
                                            </span>
                                            <span
                                                className={car.kilometersClass}
                                            >
                                                {formatNumber(car.kilometers)}
                                            </span>
                                        </div>
                                        <div
                                            className={`${styles.desc} ${styles.even}`}
                                        >
                                            <span className={styles["fw-500"]}>
                                                HP:
                                            </span>
                                            <span className={car.hpClass}>
                                                {car.hp ? car.hp : "-"}
                                            </span>
                                        </div>
                                        <div
                                            className={`${styles.desc} ${styles.odd}`}
                                        >
                                            <span className={styles["fw-500"]}>
                                                Airbag:
                                            </span>
                                            <span className={car.airbagClass}>
                                                {car.airbag ? car.airbag : "-"}
                                            </span>
                                        </div>
                                        <div
                                            className={`${styles.desc} ${styles.even}`}
                                        >
                                            <span className={styles["fw-500"]}>
                                                Transmisión:
                                            </span>
                                            <span>
                                                {transmissionString(
                                                    car.transmissionName
                                                )}
                                            </span>
                                        </div>
                                        <div
                                            className={`${styles.desc} ${styles.odd}`}
                                        >
                                            <span className={styles["fw-500"]}>
                                                Combustible:
                                            </span>
                                            <span>{car.fuelName}</span>
                                        </div>
                                        <div
                                            className={`${styles.desc} ${styles.even}`}
                                        >
                                            <span className={styles["fw-500"]}>
                                                Aire:
                                            </span>
                                            <span
                                                className={
                                                    car.air == "Climatizador"
                                                        ? styles.green
                                                        : ""
                                                }
                                            >
                                                {car.air}
                                            </span>
                                        </div>
                                        <div
                                            className={`${styles.desc} ${styles.odd}`}
                                        >
                                            <span className={styles["fw-500"]}>
                                                Color:
                                            </span>
                                            <span className={styles.capitalize}>
                                                {car.color}
                                            </span>
                                        </div>
                                        <div className={styles.divBtn}>
                                            <a
                                                className={styles.btnCard}
                                                href={`/${car.brandName.toLowerCase()}/${car.modelName.toLowerCase()}/${
                                                    car.autoID
                                                }`}
                                            >
                                                Ver más detalles
                                            </a>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Modal.Body>
        </Modal>
    );
};

export default ComparatorModal;
