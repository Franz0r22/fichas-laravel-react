import { Card } from 'react-bootstrap';
import { BsCalendar2 } from "react-icons/bs";
import { GiCarWheel } from "react-icons/gi";
import styles from './CarItem.module.css';
import { formatNumber } from '../../utils/formatNumber';

const CarItem = ({ auto }) => {

    return (
        <a href={`/${auto.MARCA.toLowerCase()}/${auto.MODELO.toLowerCase()}/${auto.AUTOID}`} className={styles.hasCta}>
            <Card className={styles.cardBox}>
                <Card.Img variant="top" src={auto.url_foto_particular} />
                <Card.Body>
                    <Card.Title className='mb-0 text-truncate'>
                        {auto.MARCA} {auto.MODELO}
                    </Card.Title>
                    <div className='text-truncate'>
                        <span>{auto.VCHVERSION}</span>
                    </div>
                    <div className={styles.featuresWrapper}>
                        <div className={styles.featuresBox}>
                            <BsCalendar2 />
                            <span>{auto.INTANO}</span>
                        </div>
                        <div className={styles.featuresBox}>
                            <GiCarWheel />
                            <span>{formatNumber(auto.VCHKILOMETROS)} Km</span>
                        </div>
                    </div>
                    <Card.Text className={styles.priceSize}>
                        <span className={styles.monedaSize}>{auto.VCHMONEDA}</span>
                        {formatNumber(auto.VCHPRECIO)}
                    </Card.Text>
                    <button className={styles.btnCard}>
                        Ver más detalles
                    </button>
                </Card.Body>
            </Card>
        </a>
    );
};

export default CarItem;