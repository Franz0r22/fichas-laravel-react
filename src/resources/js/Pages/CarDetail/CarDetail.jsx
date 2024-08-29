import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./CarDetail.module.css";
import { formatNumber } from "../../utils/formatNumber";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import CarImageGallery from "../../Components/CarImageGallery/CarImageGallery";
import CarFeatures from "../../Components/CarFeatures/CarFeatures";
import CarDescription from "../../Components/CarDescription/CarDescription";
import CarPricing from "../../Components/CarPricing/CarPricing";
import CarDetails from "../../Components/CarDetails/CarDetails";
import CarTitle from "../../Components/CarTitle/CarTitle";

const CarDetail = () => {
    const { data, error } = usePage().props;

    if (error) {
        return (
            <div className="text-center mt-4">
                <h1>Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <>
            {data ? (
                <>
                    <Head title={`${data?.brandName} ${data?.modelName}`} />

                    <Container style={{ minHeight: "100vh" }} className="my-5">
                        <Breadcrumb
                            brandName={data.brandName}
                            modelName={data.modelName}
                            version={data.version}
                        />

                        <Row className={`${styles.titleBox} mt-3`}>
                            <Col md={6}>
                                <CarTitle
                                    brand={data.brandName}
                                    model={data.modelName}
                                    version={data.version}
                                />
                                <CarDetails
                                    year={data.year}
                                    kilometers={data.kilometers}
                                    transmission={data.transmissionName}
                                    fuel={data.fuelName}
                                />
                            </Col>
                            <Col md={6}>
                                <CarPricing
                                    currency={data.currency}
                                    price={data.price}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={7} className="ps-0 pe-4">
                                <CarImageGallery photos={data.photos} />
                            </Col>
                            <Col
                                md={5}
                                className={`${styles.titleBox} mt-4 p-4`}
                            >
                                {data.description && (
                                    <CarDescription
                                        description={data.description}
                                    />
                                )}
                                <div>
                                    <h5 className={`${styles.carTitle}`}>
                                        Cotizalo Aquí
                                    </h5>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={7} className="ps-0 pe-4">
                                {data.features && (
                                    <CarFeatures features={data.features} />
                                )}
                            </Col>
                            <Col
                                md={5}
                                className={`${styles.titleBox} mt-4 p-4`}
                            ></Col>
                        </Row>
                    </Container>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default CarDetail;