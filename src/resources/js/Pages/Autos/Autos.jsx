import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { Container, Alert, Spinner } from "react-bootstrap";
import FilterForm from "../../Components/FilterForm/FilterForm";
import CarList from "../../Components/CarList/CarList";
import PaginationControl from "../../Components/PaginationControl/PaginationControl";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import useCars from '../../Hooks/useCars';

const Autos = () => {
    const { props: { data, error } } = usePage();
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
        selectedFuel,
        setSelectedFuel,
        selectedLabel,
        setSelectedLabel,
        minPrice,
        maxPrice,
        minYear,
        maxYear,
        currentPage,
        setCurrentPage,
        currentItems,
        totalPages,
    } = useCars(data);

    if (!data) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <>
            <Head title="Autos" />

            <Container style={{ minHeight: "100vh" }} className="my-5">

                <Breadcrumb 
                    items={[
                        { name: 'Catálogo' }
                    ]}
                />
                
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
                    selectedFuel={selectedFuel}
                    setSelectedFuel={setSelectedFuel}
                    selectedLabel={selectedLabel}
                    setSelectedLabel={setSelectedLabel}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    minYear={minYear}
                    maxYear={maxYear}
                    setCurrentPage={setCurrentPage}
                />

                <CarList currentItems={currentItems} />

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
