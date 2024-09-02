import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { Container, Alert, Spinner } from "react-bootstrap";
import FilterForm from "../../Components/FilterForm/FilterForm";
import CarList from "../../Components/CarList/CarList";
import PaginationControl from "../../Components/PaginationControl/PaginationControl";
import useCars from '../../Hooks/useCars';

const Autos = () => {
    const { props: { data, error } } = usePage();
    const {
        uniqueYears,
        uniqueBrands,
        uniqueModels,
        selectedYear,
        setSelectedYear,
        selectedBrand,
        setSelectedBrand,
        selectedModel,
        setSelectedModel,
        selectedPriceRange,
        setSelectedPriceRange,
        minPrice,
        maxPrice,
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
                
                <FilterForm
                    uniqueYears={uniqueYears}
                    uniqueBrands={uniqueBrands}
                    uniqueModels={uniqueModels}
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    selectedBrand={selectedBrand}
                    setSelectedBrand={setSelectedBrand}
                    selectedModel={selectedModel}
                    setSelectedModel={setSelectedModel}
                    selectedPriceRange={selectedPriceRange}
                    setSelectedPriceRange={setSelectedPriceRange}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
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
