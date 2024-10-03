import { Card } from "react-bootstrap";
import { BsCalendar2 } from "react-icons/bs";
import { GiCarWheel, GiGearStick, GiGasPump } from "react-icons/gi";
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

    const toggleCarInComparator = (car) => {
        setComparator((prev) => {
            const prevCars = [...prev];
            const existingCarIndex = prevCars.findIndex(
                (c) => c.carId === car.carId
            );

            // Verificar si el coche ya está en el comparador
            if (existingCarIndex > -1) {
                // Si ya está, eliminarlo
                return prevCars.filter((c) => c.carId !== car.carId);
            } else if (prevCars.length < 3) {
                // Si no está y el comparador tiene menos de 3 coches, agregarlo
                return [...prevCars, car];
            } else {
                // Mostrar una alerta si ya hay 3 coches
                // alert("Solo puedes comparar hasta 3 coches.");

                return prevCars;
            }
        });
    };

    const isCarInComparator = (car) => {
        return comparator.some((c) => c.carId === car.carId);
    };

    return (
        <>
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
                                <div className={styles["div-comparador"]}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={isCarInComparator(auto)}
                                            onChange={() =>
                                                toggleCarInComparator({
                                                    carId: auto.carId,
                                                    brand: auto.brand,
                                                    model: auto.model,
                                                    photo: auto.photo,
                                                    price: auto.price,
                                                })
                                            }
                                            className={styles.checkbox}
                                        />
                                        <span className="px-2">Comparar</span>
                                    </label>
                                </div>
                                <Card.Img
                                    variant="top"
                                    loading="lazy"
                                    src={getImageSrc()}
                                    className={styles.cardImg}
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
