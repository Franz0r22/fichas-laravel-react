import { Row, Alert, Col } from 'react-bootstrap';
import CarItem from '../CarItem/CarItem';
import styles from './CarList.module.css';

const CarList = ({ currentItems }) => {
    return (
        <Row>
            {currentItems.length > 0 ? (
                currentItems.map((auto) => (
                    <CarItem key={auto.AUTOID} auto={auto} />
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
