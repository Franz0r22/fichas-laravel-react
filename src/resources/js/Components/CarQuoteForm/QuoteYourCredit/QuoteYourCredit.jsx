import React, { useState, useEffect } from "react";
import { Collapse } from 'react-bootstrap';
import InputField from "../InputField";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import styles from './QuoteYourCredit.module.css';
import { formatNumber } from "../../../utils/formatNumber";

const QuoteYourCredit = ({ data, handleChange, getError}) => {

    const [openCredit, setOpenCredit] = useState(false);
    const [openConsignment, setOpenConsignment] = useState(false);
    const [unformattedPie, setUnformattedPie] = useState(data.pie || '');
    const [creditTerm, setCreditTerm] = useState(data.creditTerm || '');

    const handlePieChange = (e) => {
        const { value } = e.target;
        if (/^\d*$/.test(value)) {
            setUnformattedPie(value);
            handleChange(e);
        }
    };

    const handlePieBlur = () => {
        if (unformattedPie) {
            handleChange({
                target: {
                    name: 'pie',
                    value: formatNumber(unformattedPie),
                },
            });
        }
    };

    // useEffect(() => {
    //     validateCreditTerm(data.pie, creditTerm);
    // }, [data.pie, creditTerm]);

    const handleCreditTermChange = (e) => {
        const { value } = e.target;
        setCreditTerm(value);
        handleChange(e);
    };

    return (
        <>
            <a role="button" 
                onClick={() => setOpenCredit(!openCredit)}
                aria-controls="credit-collapse"
                aria-expanded={openCredit}
                className={`${styles.creditLink} d-flex align-items-center justify-content-between fs-14 fw-bold`}>
                COTIZA TU CRÉDITO
                <span className={`arrow ${openCredit ? 'up' : 'down'}`}>
                    {openCredit ? <FaAngleUp /> : <FaAngleDown />}
                </span>
            </a>
            <Collapse in={openCredit}>
                <div id="credit-collapse">
                    <InputField
                        label="Pie"
                        name="pie"
                        value={unformattedPie}
                        onChange={handlePieChange}
                        onBlur={handlePieBlur}
                        error={getError("pie")}
                    />
                    <div className="mt-3">
                        <label className={styles.formLabel}>Cuotas</label>
                        <div className={`d-flex align-items-center justify-content-between`}>
                            {[12, 24, 36, 48, 60].map((months) => (
                                <label key={months} className={styles.formLabel}>
                                    <input
                                        type="radio"
                                        name="creditTerm"
                                        value={months}
                                        checked={creditTerm === months.toString()}
                                        onChange={handleCreditTermChange}
                                        className={styles.radioCredit}
                                    />
                                    <span></span>
                                    {months}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </Collapse>

            <a role="button" 
                onClick={() => setOpenConsignment(!openConsignment)}
                aria-controls="consignment-collapse"
                aria-expanded={openConsignment}
                className={`${styles.creditLink} d-flex align-items-center justify-content-between mt-3 fs-14 fw-bold`}>
                DEJA TU AUTO EN PARTE DE PAGO
                <span className={`arrow ${openConsignment ? 'up' : 'down'}`}>
                    {openConsignment ? <FaAngleUp /> : <FaAngleDown />}
                </span>
            </a>
            <Collapse in={openConsignment}>
                <div id="consignment-collapse">
                    <InputField
                        label="Marca"
                        name="marca"
                        value={data.marca}
                        onChange={handleChange}
                        error={getError("marca")}
                    />
                    <InputField
                        label="Modelo"
                        name="modelo"
                        value={data.modelo}
                        onChange={handleChange}
                        error={getError("modelo")}
                    />
                    <InputField
                        label="Año"
                        name="anio"
                        value={data.anio}
                        onChange={handleChange}
                        error={getError("anio")}
                    />
                    <InputField
                        label="Kilometraje"
                        name="kilometraje"
                        value={data.kilometraje}
                        onChange={handleChange}
                        error={getError("kilometraje")}
                    />
                </div>
            </Collapse>
        </>
    );
};

export default QuoteYourCredit;
