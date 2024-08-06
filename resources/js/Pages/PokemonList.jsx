import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";

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
                        <h1>Pokémones</h1>
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
                                    <Card>
                                        <Card.Img
                                            variant="top"
                                            src={pokemon.image}
                                        />
                                        <Card.Body>
                                            <Card.Title style={{textTransform:"uppercase"}}>
                                                {pokemon.name}
                                            </Card.Title>
                                            <Card.Link href={pokemon.url}>
                                                Ver más
                                            </Card.Link>
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
