import React from 'react';
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
import CarImageGallery from '../../Components/CarImageGallery/CarImageGallery';
import CarFeatures from '../../Components/CarFeatures/CarFeatures';
import CarDescription from '../../Components/CarDescription/CarDescription';
import { Head, usePage } from '@inertiajs/react';
import { Container, Row, Col } from "react-bootstrap";
import styles from './CarDetail.module.css'
import { formatNumber } from '../../utils/formatNumber';


const CarDetail = () => {
    const { data, error } = usePage().props;

    if (error) {
        return (
            <div className='text-center mt-4'>
                <h1>Error</h1>
                <p>{error}</p>
            </div>
        );
    }
    
    return (
        <>
            {data ? (
                <>
                    <Head title={`${data?.brandName} ${data?.modelName}`}  />
        
                    <Container style={{ minHeight: "100vh" }} className="my-5">

                        <Breadcrumb 
                            brandName={data.brandName}
                            modelName={data.modelName}
                            version={data.version}
                        />

                        <Row className={`${styles.titleBox} mt-3`}>
                            <Col md={6}>
                                <h1 className={styles.carTitle}>{data.brandName} {data.modelName}</h1>
                                <h2 className={styles.versionTitle}>{data.version}</h2>
                                <div className={styles.featuresBox}>
                                    <span>
                                        {data.year} |
                                    </span>
                                    <span>
                                        {data.kilometers ? `${formatNumber(data.kilometers)} Km` : ''} |
                                    </span>
                                    <span>
                                        {data.transmissionName.replace('Transmisión ', '')} |
                                    </span>
                                    <span>
                                        {data.fuelName}
                                    </span>
                                </div>
                            </Col>
                            <Col md={6}>
                                {data.price != null ? (
                                    <h3 className={styles.carPrice}>
                                        <span className={styles.monedaSize}>{data.currency}</span>{formatNumber(data.price)}
                                    </h3>
                                ) : 'Consultar precio'}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={7} className='ps-0 pe-4'>
                                <CarImageGallery photos={data.photos} />
                            </Col>
                            <Col md={5} className={`${styles.titleBox} mt-4 p-4`}>
                                {data.description && 
                                    <CarDescription 
                                        Description={data.description}
                                    />
                                }
                                <div>
                                    <h5 className={`${styles.carTitle}`}>Cotizalo Aquí</h5>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={7} className='ps-0 pe-4'>
                                {data.features &&
                                    <CarFeatures 
                                        features={data.features}
                                    />
                                }
                            </Col>
                            <Col md={5} className={`${styles.titleBox} mt-4 p-4`}>
                                
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