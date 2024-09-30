import { Card } from "react-bootstrap";
import { BsCalendar2 } from "react-icons/bs";
import { GiCarWheel } from "react-icons/gi";
import { GiGearStick } from "react-icons/gi";
import { GiGasPump } from "react-icons/gi";
import styles from "./CarItem.module.css";
import { formatNumber } from "../../utils/formatNumber";
import CarLabel from "./CarLabel";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState, useEffect } from "react";
import { useCars } from "../../Contexts/CarsContext";

const CarItem = ({ auto }) => {
    const [imageStatus, setImageStatus] = useState("loading");
    const { comparator, setComparator } = useCars();
    console.log(comparator);
    // localStorage.clear();

    useEffect(() => {
        const img = new Image();
        img.src = auto.photo;
        img.onload = () => setImageStatus("loaded");
        img.onerror = () => setImageStatus("error");
    }, [auto.photo]);

    const getImageSrc = () => {
        if (imageStatus === "error") {
            return "/images/placeholder-noimage.jpg";
        }
        return auto.photo;
    };

    // Función para manejar la lógica de agregar o eliminar un coche del comparator
    const toggleCarInComparator = (car) => {
        setComparator((prev) => {
            const prevCars = [...prev]; // Copia el array anterior
            const existingCarIndex = prevCars.findIndex(
                (c) => c.carId === car.carId
            );

            if (existingCarIndex > -1) {
                // Si el coche ya está, lo elimina
                return prevCars.filter((c) => c.carId !== car.carId);
            } else {
                // Si no está, lo agrega
                return [...prevCars, car];
            }
        });
    };

    // Función para verificar si el coche está en el comparator
    const isCarInComparator = (car) => {
        return comparator.some((c) => c.carId === car.carId);
    };

    return (
        <>
            <button
                type="button"
                onClick={() =>
                    toggleCarInComparator({
                        carId: auto.carId,
                        brand: auto.brand,
                        model: auto.model,
                        photo: auto.photo,
                    })
                }
                className={`${styles.btnCard} ${
                    isCarInComparator(auto) ? styles.btnCardActive : ""
                }`}
            >
                Comparar
            </button>
            <a
                href={`/${auto.brand.toLowerCase()}/${auto.model.toLowerCase()}/${
                    auto.carId
                }`}
                className={styles.hasCta}
            >
                <Card className={styles.cardBox}>
                    {imageStatus === "loading" ? (
                        <Skeleton height={400} width="100%" />
                    ) : (
                        <>
                            <div className={styles.imgWrapper}>
                                <Card.Img
                                    variant="top"
                                    src={getImageSrc()}
                                    className={styles.cardImg}
                                    alt={`${auto.brand} ${auto.model}`}
                                />
                                {auto.ribbonName && (
                                    <CarLabel
                                        ribbonName={auto.ribbonName}
                                        ribbonColor={auto.ribbonColor}
                                        ribbonTextColor={auto.ribbonTextColor}
                                    />
                                )}
                            </div>
                            <Card.Body>
                                <Card.Title className="mb-0 text-truncate">
                                    {auto.brand} {auto.model}
                                </Card.Title>
                                <div className="text-truncate">
                                    <span>{auto.version}</span>
                                </div>
                                <div
                                    className={`${styles.featuresWrapper} mt-3`}
                                >
                                    <div className={styles.featuresBox}>
                                        <BsCalendar2
                                            className={styles.iconSize}
                                        />
                                        <span>{auto.year}</span>
                                    </div>
                                    <div className={styles.featuresBox}>
                                        <GiCarWheel
                                            className={styles.iconSize}
                                        />
                                        <span className="text-truncate">
                                            {formatNumber(auto.mileage)} Km
                                        </span>
                                    </div>
                                    <div className={styles.featuresBox}>
                                        <GiGearStick
                                            className={styles.iconSize}
                                        />
                                        <span>
                                            {auto.transmissionType.replace(
                                                "Transmisión",
                                                ""
                                            )}
                                        </span>
                                    </div>
                                    <div className={styles.featuresBox}>
                                        <GiGasPump
                                            className={styles.iconSize}
                                        />
                                        <span>{auto.fuelType}</span>
                                    </div>
                                </div>
                                <Card.Text
                                    className={`${styles.priceSize} mt-3`}
                                >
                                    <span className={styles.monedaSize}>
                                        {auto.currency}
                                    </span>
                                    {formatNumber(auto.price)}
                                </Card.Text>
                                <button className={styles.btnCard}>
                                    Ver más detalles
                                </button>
                            </Card.Body>
                        </>
                    )}
                </Card>
            </a>
        </>
    );
};

export default CarItem;
