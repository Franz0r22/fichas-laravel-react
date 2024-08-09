import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { Container, Row, Col, Card, Alert, Badge } from "react-bootstrap";

import pokemonLogo from '@public/images/pokemon.png';

import SearchBar from "../Components/SearchBar";


const PokemonList = ({ pokemons, error }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Head title="Pokémones" />

            <div className="text-center my-3">
                <img src={pokemonLogo} alt="pokemon logo" width={300}/>
            </div>            
						
            <Container style={{ minHeight: "100vh" }} className="my-5">
						<SearchBar
                            searchTerm={searchTerm}
                            handleSearch={handleSearch}
                        />
                <Row
                    className="justify-content-md-center align-items-center"
                    style={{ height: "100%" }}
                >
                    <Col>
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Row>
                            {filteredPokemons.map((pokemon) => (
                                <Col
                                    key={pokemon.name}
                                    sm={12}
                                    md={6}
                                    lg={4}
                                    xl={3}
                                    className="mb-4"
                                >
                                    <Card bg='dark'>
                                        <Card.Img
                                            variant="top"
                                            src={pokemon.image}
                                            className="p-3"
                                        />
                                        <Card.Body className="d-flex flex-row justify-content-between">
                                            <Card.Title className="text-uppercase text-white mb-0">
                                                {pokemon.name}
                                            </Card.Title>
                                            <Badge bg='primary' className="text-capitalize">
                                                {pokemon.type}
                                            </Badge>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default PokemonList;
