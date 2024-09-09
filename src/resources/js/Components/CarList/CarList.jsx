import { Row, Alert, Col } from 'react-bootstrap';
import CarItem from '../CarItem/CarItem';
import styles from './CarList.module.css';


const CarList = ({ currentItems }) => {

    const isLatFilter = import.meta.env.VITE_FILTER_LAT === 'true';

    return (
        <Row>
            {currentItems.length > 0 ? (
                currentItems.map((auto) => (
                    <Col xl={isLatFilter ? 4 : 3} sm={12} md={6} className="mb-4" key={auto.AUTOID}>
                        <CarItem auto={auto} />
                    </Col>
                ))
            ) : (
                <Col className="text-center">
                    <Alert variant="info">No se encontraron vehículos que coincidan con los filtros aplicados.</Alert>
                </Col>
            )}
        </Row>
    );
};

export default CarList;
