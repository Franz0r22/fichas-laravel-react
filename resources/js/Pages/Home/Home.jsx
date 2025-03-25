import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import CarCarousel from "../../Components/CarCarousel/CarCarousel";
import TopCarousel from "../../Components/TopCarousel/TopCarousel";
import useCars from "../../Hooks/useCars";
import placeholder from "@images/placeholder.webp";
import SearchCar from "../../Components/SearchCar/SearchCar";

const Home = () => {
    const {
        props: { data, error },
    } = usePage();

    const {
        uniqueCategories,
        uniqueBrands,
        uniqueModels,
        uniqueFuels,
        uniqueLabels,
        uniqueSellers,
        selectedYear,
        setSelectedYear,
        selectedBrand,
        setSelectedBrand,
        selectedModel,
        setSelectedModel,
        selectedPriceRange,
        setSelectedPriceRange,
        selectedYearRange,
        setSelectedYearRange,
        selectedKmRange,
        setSelectedKmRange,
        selectedFuel,
        setSelectedFuel,
        selectedLabel,
        setSelectedLabel,
        selectedCategory,
        setSelectedCategory,
        selectedSeller,
        setSelectedSeller,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        minKm,
        maxKm,
    } = useCars(data);


    const { currentItems } = useCars(data);

    const slides = [
        {
            image: placeholder,
            label: "Primer Slide",
            // text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
        },
        // {
        //     // image: 'path/to/image2.jpg',
        //     // label: 'Segundo Slide',
        //     // text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        // },
        // {
        //     // image: 'path/to/image3.jpg',
        //     // label: 'Tercer Slide',
        //     // text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
        // }
    ];

    if (!currentItems) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <>
            <Head>
                <title>Home</title>
                <meta
                    name="description"
                    content="Visita nuestra web para cotizar autos usados de forma rápida y sencilla. Compara precios, accede a detalles completos y encuentra el vehículo ideal para ti. Tu próximo auto te está esperando."
                />
            </Head>

            <TopCarousel slides={slides} />
            <SearchCar 
                uniqueCategories={uniqueCategories}
                uniqueBrands={uniqueBrands}
                uniqueModels={uniqueModels}
                uniqueFuels={uniqueFuels}
                uniqueLabels={uniqueLabels}
                uniqueSellers={uniqueSellers}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
                selectedYearRange={selectedYearRange}
                setSelectedYearRange={setSelectedYearRange}
                selectedKmRange={selectedKmRange}
                setSelectedKmRange={setSelectedKmRange}
                selectedFuel={selectedFuel}
                setSelectedFuel={setSelectedFuel}
                selectedLabel={selectedLabel}
                setSelectedLabel={setSelectedLabel}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSeller={selectedSeller}
                setSelectedSeller={setSelectedSeller}
                minPrice={minPrice}
                maxPrice={maxPrice}
                minYear={minYear}
                maxYear={maxYear}
                minKm={minKm}
                maxKm={maxKm}
                data={data}
            />
            <Container style={{ minHeight: "100vh" }} className="my-5">
                <Row className="justify-content-md-center">
                    <Col md="auto" className="text-center mb-4">
                        <h4 className="fw-bold text-uppercase fs-24">
                            Vehículos Destacados
                        </h4>
                    </Col>
                    <CarCarousel currentItems={currentItems} />
                </Row>
            </Container>
        </>
    );
};

export default Home;
