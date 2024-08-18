import React, { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";

import { Container, Alert, Spinner } from "react-bootstrap";

import FilterForm from "../Components/FilterForm/FilterForm";
import CarList from "../Components/CarList/CarList";
import PaginationControl from "../Components/PaginationControl/PaginationControl";

const Autos = () => {
    const { data, error } = usePage().props;

    const [selectedYear, setSelectedYear] = useState("");
    const [uniqueYears, setUniqueYears] = useState([]);

    const [selectedBrand, setSelectedBrand] = useState("");
    const [uniqueBrands, setUniqueBrands] = useState([]);

    const [selectedModel, setSelectedModel] = useState("");
    const [uniqueModels, setUniqueModels] = useState([]);
    const [modelsByBrand, setModelsByBrand] = useState({});

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    useEffect(() => {
        if (data) {
            const years = [...new Set(data.map((auto) => auto.INTANO))].sort(
                (a, b) => b - a
            );
            setUniqueYears(years);

            const brands = [...new Set(data.map((auto) => auto.MARCA))].sort();
            setUniqueBrands(brands);

            const modelsMap = {};
            data.forEach((auto) => {
                if (!modelsMap[auto.MARCA]) {
                    modelsMap[auto.MARCA] = new Set();
                }
                modelsMap[auto.MARCA].add(auto.MODELO);
            });
            setModelsByBrand(modelsMap);
        }
    }, [data]);

    useEffect(() => {
        const filteredData = handleFilter();
        const years = [...new Set(filteredData.map((auto) => auto.INTANO))].sort((a, b) => b - a);
        setUniqueYears(years);
    }, [selectedBrand, selectedModel, data]);

    useEffect(() => {
        if (selectedBrand && modelsByBrand[selectedBrand]) {
            setUniqueModels([...modelsByBrand[selectedBrand]]);
        } else {
            setUniqueModels([]);
        }
    }, [selectedBrand, modelsByBrand]);


    const handleFilter = () => {
        return data.filter((auto) => {
            const yearMatch = selectedYear
                ? auto.INTANO === parseInt(selectedYear)
                : true;
            const brandMatch = selectedBrand
                ? auto.MARCA === selectedBrand
                : true;
            const modelMatch = selectedModel
                ? auto.MODELO === selectedModel
                : true;
            return yearMatch && brandMatch && modelMatch;
        });
    };

    const filteredData = handleFilter();
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / pageSize);

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
