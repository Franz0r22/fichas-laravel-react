import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./CarDetail.module.css";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import CarImageGallery from "../../Components/CarImageGallery/CarImageGallery";
import CarFeatures from "../../Components/CarFeatures/CarFeatures";
import CarDescription from "../../Components/CarDescription/CarDescription";
import CarPricing from "../../Components/CarPricing/CarPricing";
import CarDetails from "../../Components/CarDetails/CarDetails";
import CarTitle from "../../Components/CarTitle/CarTitle";
import CarMap from "../../Components/CarMap/CarMap";
import CarQuoteForm from "../../Components/CarQuoteForm/CarQuoteForm";
import CarWhatsAppBtn from "../../Components/CarWhatsAppBtn/CarWhatsAppBtn";
import ShareButtons from "../../Components/ShareButtons/ShareButtons";

const CarDetail = () => {
    const { data, error, honeypot } = usePage().props;
    const shareUrl = window.location.href;
    const shareTitle = "¡Me gustó este vehículo!";

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
                    <Head>
                        <title>{`${data?.brandName} ${data?.modelName}`}</title>
                        <meta
                            name="description"
                            content={`Conoce a fondo el ${data?.brandName} ${data?.modelName}. Revisa especificaciones, fotos y precio. Cotiza este auto usado y toma la mejor decisión para tu próxima compra.`}
                        />
                    </Head>

                    <Container style={{ minHeight: "100vh" }} className="my-5">
                        <Row>
                            <Col
                                md={12}
                                className="d-flex justify-content-between align-items-center"
                            >
                                <Breadcrumb
                                    items={[
                                        {
                                            name: data.brandName,
                                            link: `${route("cars")}/?brand=${
                                                data.brandName
                                            }`,
                                        },
                                        {
                                            name: data.modelName,
                                            link: `${route("cars")}/?model=${
                                                data.modelName
                                            }`,
                                        },
                                        { name: data.version },
                                    ]}
                                />
                                <ShareButtons
                                    url={shareUrl}
                                    title={shareTitle}
                                />
                            </Col>
                        </Row>
                        <Row className={`${styles.titleBox} mt-2`}>
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
                                        description={data.description ? data.description : 'No hay descripción disponible'}
                                    />
                                )}
                                <div>
                                    <CarQuoteForm
                                        carData={data}
                                        honeypot={honeypot}
                                    />
                                </div>
                                {data.whatsApp && (
                                    <div className="mt-3">
                                        <CarWhatsAppBtn
                                            whatsApp={data.whatsApp}
                                            brandName={data.brandName}
                                            modelName={data.modelName}
                                            version={data.version}
                                        />
                                    </div>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={7} className="ps-0 pe-4">
                                {data.features && data.features.length > 0 && (
                                    <CarFeatures features={data.features} />
                                )}
                            </Col>
                            <Col
                                md={5}
                                className={`${styles.titleBox} mt-4 p-4`}
                            >
                                <CarMap
                                    latitude={data.latitude}
                                    longitude={data.length}
                                    clientLogo={data.clientLogo}
                                />
                            </Col>
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
