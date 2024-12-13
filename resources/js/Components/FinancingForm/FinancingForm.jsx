import React from "react";
import InputField from "../CarQuoteForm/InputField";
import Notification from "../Notification/Notification";
import styles from "./FinancingForm.module.css";
import useFormHandler from "../../Hooks/useFormHandler";

const FinancingForm = ({ honeypot }) => {
    const initialData = {
        name: "",
        email: "",
        message: "",
        captcha_token: "",
        rut: "",
        phone: "",
        creditAmount: "",
        installments: "",
        vehicleBrand: "",
        vehicleModel: "",
        vehicleYear: "",
    };

    const {
        data,
        handleChange,
        handleSubmit,
        processing,
        showNotification,
        setShowNotification,
        getError,
    } = useFormHandler(initialData, honeypot, route("financing"));

    return (
        <>
            <Notification
                message="¡Gracias! Tu mensaje ha sido enviado con éxito. Nos pondremos en contacto contigo pronto."
                isVisible={showNotification}
                onClose={() => setShowNotification(false)}
            />
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
                {/* Campos Honeypot */}
                {honeypot.enabled && (
                    <div style={{ display: "none" }}>
                        <input
                            type="text"
                            name={honeypot.nameFieldName}
                            value={data[honeypot.nameFieldName] || ""}
                            onChange={(e) =>
                                setData(honeypot.nameFieldName, e.target.value)
                            }
                        />
                        <input
                            type="text"
                            name={honeypot.validFromFieldName}
                            value={data[honeypot.validFromFieldName] || ""}
                            onChange={(e) =>
                                setData(
                                    honeypot.validFromFieldName,
                                    e.target.value
                                )
                            }
                        />
                    </div>
                )}

                <div className="row">
                    <div className="col-lg-4">
                        <InputField
                            label="Nombre"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            error={getError("name")}
                        />
                    </div>

                    <div className="col-lg-4">
                        <InputField
                            label="Rut "
                            name="rut"
                            value={data.rut}
                            onChange={handleChange}
                            error={getError("rut")}
                        />
                    </div>

                    <div className="col-lg-4">
                        <InputField
                            label="Teléfono"
                            name="phone"
                            value={data.phone}
                            onChange={handleChange}
                            error={getError("phone")}
                        />
                    </div>

                    <div className="col-lg-4">
                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={handleChange}
                            error={getError("email")}
                        />
                    </div>

                    <div className="col-lg-4">
                        <InputField
                            label="Monto del crédito"
                            name="creditAmount"
                            value={data.creditAmount}
                            onChange={handleChange}
                            error={getError("creditAmount")}
                        />
                    </div>

                    <div className="col-lg-4">
                        <InputField
                            label="Catidad de cuotas"
                            name="installments"
                            value={data.installments}
                            onChange={handleChange}
                            error={getError("installments")}
                        />
                    </div>

                    <div className="col-lg-12 mt-3">
                        <h5>¡Desea entregar un vehículo como parte de pago?</h5>
                    </div>

                    <div className="col-lg-4">
                        <InputField
                            label="Marca del vehículo"
                            name="vehicleBrand"
                            value={data.vehicleBrand}
                            onChange={handleChange}
                            error={getError("vehicleBrand")}
                        />
                    </div>

                    <div className="col-lg-4">
                        <InputField
                            label="Modelo del vehículo"
                            name="vehicleModel"
                            value={data.vehicleModel}
                            onChange={handleChange}
                            error={getError("vehicleModel")}
                        />
                    </div>

                    <div className="col-lg-4">
                        <InputField
                            label="Año del vehículo"
                            name="vehicleYear"
                            value={data.vehicleYear}
                            onChange={handleChange}
                            error={getError("vehicleYear")}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="message" className={styles.formLabel}>
                        Mensaje
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={data.message}
                        onChange={handleChange}
                        className={`form-control ${styles.formMessage} ${
                            getError("message") ? "is-invalid" : ""
                        }`}
                    />
                    {getError("message") && (
                        <div className="invalid-feedback">
                            {getError("message")}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className={`${styles.btnForm} mt-3 ${
                        processing ? styles.btnDisabled : ""
                    }`}
                >
                    {processing ? "Enviando..." : "Enviar"}
                </button>
            </form>
        </>
    );
};

export default FinancingForm;
