import React, { useState } from "react";
import { Button, Collapse, Form } from "react-bootstrap";
import InputField from "./InputField";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
// import CheckInlineExample from "./CheckInlineExample";

const QuoteYourCredit = ({ data, handleChange, getError }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <a role="button" 
                onClick={() => setOpen(!open)}
                aria-controls="credit-collapse"
                aria-expanded={open}
                className="d-flex align-items-center justify-content-between">
                COTIZA TU CRÉDITO
                <span className={`arrow ${open ? 'up' : 'down'}`}>
                    {open ? <FaAngleUp /> : <FaAngleDown />}
                </span>
            </a>
            <Collapse in={open}>
                <div id="credit-collapse">
                    <InputField
                        label="Pie"
                        name="pie"
                        value={data.pie}
                        onChange={handleChange}
                        error={getError("pie")}
                    />
                    {["radio"].map((type) => (
                        <div key={`inline-${type}`} className="my-3">
                            <Form.Check
                                inline
                                label="1"
                                name={`group1`}
                                type={type}
                                id={`inline-${type}-1`}
                            />
                            <Form.Check
                                inline
                                label="2"
                                name={`group1`}
                                type={type}
                                id={`inline-${type}-2`}
                            />
                            <Form.Check
                                inline
                                label="3"
                                name={`group1`}
                                type={type}
                                id={`inline-${type}-3`}
                            />
                        </div>
                    ))}
                </div>
            </Collapse>
        </>
    );
};

export default QuoteYourCredit;
