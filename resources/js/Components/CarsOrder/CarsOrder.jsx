import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import styles from "./CarsOrder.module.css";

const CarsOrder = ({ setSortCriteria, sortCriteria }) => {
    const handlePriceOrder = (e) => {
        setSortCriteria(e.target.value);
    };

    return (
        <Form.Select
            className={styles.formSelect}
            onChange={handlePriceOrder}
            value={sortCriteria}
        >
            <option value="">Ordena tu búsqueda</option>
            <option value="asc">Precio Menor</option>
            <option value="desc">Precio Mayor</option>
            <option value="newest">Más Reciente</option>
            <option value="oldest">Más Antiguo</option>
        </Form.Select>
    );
};

export default CarsOrder;
