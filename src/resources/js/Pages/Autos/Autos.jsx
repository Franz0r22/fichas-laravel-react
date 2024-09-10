import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { Container, Alert, Spinner, Row, Col } from "react-bootstrap";
import FilterForm from "../../Components/FilterForm/FilterForm";
import CarList from "../../Components/CarList/CarList";
import PaginationControl from "../../Components/PaginationControl/PaginationControl";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import CarsOrder from "../../Components/CarsOrder/CarsOrder";
import StockTotal from "../../Components/StockTotal/StockTotal";
import useCars from "../../Hooks/useCars";
import useSort from "../../Hooks/useSort";

const Autos = () => {
    const {
        props: { data, error },
    } = usePage();
    const {
        uniqueBrands,
        uniqueModels,
        uniqueFuels,
        uniqueLabels,
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
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        minKm,
        maxKm,
        currentPage,
        setCurrentPage,
        currentItems,
        totalPages,
    } = useCars(data);

    const { sortedItems, sortCriteria, setSortCriteria } =
        useSort(currentItems);

    const isLatFilter = import.meta.env.VITE_FILTER_LAT === "true";

    if (!data) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <>
            <Head title="Autos" />

            <Container style={{ minHeight: "100vh" }} className="my-5">
                <Breadcrumb items={[{ name: "Catálogo" }]} />

                {!isLatFilter && (
                    <FilterForm
                        uniqueBrands={uniqueBrands}
                        uniqueModels={uniqueModels}
                        uniqueFuels={uniqueFuels}
                        uniqueLabels={uniqueLabels}
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
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        minYear={minYear}
                        maxYear={maxYear}
                        minKm={minKm}
                        maxKm={maxKm}
                        setCurrentPage={setCurrentPage}
                    />
                )}

                <Row className="mb-3 justify-content-between align-items-center">
                    <Col xs={3}>
                        <StockTotal
                            currentItems={currentItems}
                            totalItems={data.length}
                        />
                    </Col>
                    <Col xs={3}>
                        <CarsOrder
                            setSortCriteria={setSortCriteria}
                            sortCriteria={sortCriteria}
                        />
                    </Col>
                </Row>
                <Row>
                    {isLatFilter && (
                        <Col lg={3}>
                            <FilterForm
                                uniqueBrands={uniqueBrands}
                                uniqueModels={uniqueModels}
                                uniqueFuels={uniqueFuels}
                                uniqueLabels={uniqueLabels}
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
                                minPrice={minPrice}
                                maxPrice={maxPrice}
                                minYear={minYear}
                                maxYear={maxYear}
                                minKm={minKm}
                                maxKm={maxKm}
                                setCurrentPage={setCurrentPage}
                            />
                        </Col>
                    )}
                    <Col lg={isLatFilter ? 9 : 12}>
                        <CarList currentItems={sortedItems} />
                    </Col>
                </Row>

                <PaginationControl
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </Container>
        </>
    );
};

export default Autos;
