import { Col, Card } from 'react-bootstrap';
import { BsCalendar4Event } from "react-icons/bs";
import styles from './CarItem.module.css';

const CarItem = ({ auto }) => {
    return (
        <Col sm={12} md={6} lg={4} xl={3} className="mb-4">
            <Card>
                <Card.Img variant="top" src={auto.url_foto_particular} />
                <Card.Body>
                    <Card.Title>
                        {auto.MARCA} {auto.MODELO}
                    </Card.Title>
                    <div>
                        <span>{auto.VCHVERSION}</span>
                    </div>
                    <div>
                        <span><BsCalendar4Event /></span>
                        <span>{auto.INTANO}</span>
                    </div>
                    <Card.Text>{auto.VCHMONEDA} {auto.VCHPRECIO.toLocaleString()}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default CarItem;