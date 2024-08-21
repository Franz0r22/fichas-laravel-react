import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <Form className='my-3'>
      <Form.Group controlId="search">
        <Form.Label>Busca tu pokémon</Form.Label>
        <Form.Control
          type="text"
          placeholder="Escribe el nombre..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>
    </Form>
  );
};

export default SearchBar;
