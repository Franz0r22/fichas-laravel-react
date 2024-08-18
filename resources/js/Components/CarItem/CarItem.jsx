import { Col, Card } from 'react-bootstrap';
import { BsCalendar2 } from "react-icons/bs";
import { BsSpeedometer2 } from "react-icons/bs";
import styles from './CarItem.module.css';
import { formatNumber } from '../../utils/formatNumber';

const CarItem = ({ auto }) => {
    return (
        <Col sm={12} md={6} lg={4} xl={3} className="mb-4">
            <Card>
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
                            <BsSpeedometer2 />
                            <span>{formatNumber(auto.VCHKILOMETROS)} Km</span>
                        </div>
                    </div>
                    <Card.Text className={styles.priceSize}>
                        <span className={styles.monedaSize}>{auto.VCHMONEDA}</span> 
                        {formatNumber(auto.VCHPRECIO)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default CarItem;