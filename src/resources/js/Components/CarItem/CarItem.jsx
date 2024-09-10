import { Card } from 'react-bootstrap';
import { BsCalendar2 } from "react-icons/bs";
import { GiCarWheel } from "react-icons/gi";
import { GiGearStick } from "react-icons/gi";
import { GiGasPump } from "react-icons/gi";
import styles from './CarItem.module.css';
import { formatNumber } from '../../utils/formatNumber';
import CarLabel from './CarLabel';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState, useEffect } from 'react';

const CarItem = ({ auto }) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = auto.url_foto_particular;
        img.onload = () => setLoading(false);
    }, [auto.url_foto_particular]);

    return (
        <a href={`/${auto.MARCA.toLowerCase()}/${auto.MODELO.toLowerCase()}/${auto.AUTOID}`} className={styles.hasCta}>
            <Card className={styles.cardBox}>

                {loading ? (
                    <Skeleton height={400} width="100%" />
                ) : (
                    <>
                        <div className={styles.imgWrapper}>
                            <Card.Img variant="top" src={auto.url_foto_particular} className={styles.cardImg} />
                            {auto.VCHETIQUETA_TITULO &&
                                <CarLabel
                                    labelName={auto.VCHETIQUETA_TITULO}
                                    labelColor={auto.VCHETIQUETA_COLOR}
                                    fontColor={auto.fontcolor}
                                />}
                        </div>
                        <Card.Body>
                            <Card.Title className='mb-0 text-truncate'>
                                {auto.MARCA} {auto.MODELO}
                            </Card.Title>
                            <div className='text-truncate'>
                                <span>{auto.VCHVERSION}</span>
                            </div>
                            <div className={`${styles.featuresWrapper} mt-3`}>
                                <div className={styles.featuresBox}>
                                    <BsCalendar2 className={styles.iconSize} />
                                    <span>{auto.INTANO}</span>
                                </div>
                                <div className={styles.featuresBox}>
                                    <GiCarWheel className={styles.iconSize} />
                                    <span className='text-truncate'>{formatNumber(auto.VCHKILOMETROS)} Km</span>
                                </div>
                                <div className={styles.featuresBox}>
                                    <GiGearStick className={styles.iconSize} />
                                    <span>{auto.TRANSMISION.replace('Transmisión', '')}</span>
                                </div>
                                <div className={styles.featuresBox}>
                                    <GiGasPump className={styles.iconSize} />
                                    <span>{auto.COMBUSTIBLE}</span>
                                </div>
                            </div>
                            <Card.Text className={`${styles.priceSize} mt-3`}>
                                <span className={styles.monedaSize}>{auto.VCHMONEDA}</span>
                                {formatNumber(auto.VCHPRECIO)}
                            </Card.Text>
                            <button className={styles.btnCard}>
                                Ver más detalles
                            </button>
                        </Card.Body>
                    </>
                )}
            </Card>
        </a>
    );
};

export default CarItem;