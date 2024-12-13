import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './SearchForm.module.css'

const SearchForm = ({ keyword, setKeyword }) => {
    const handleSearchChange = (e) => {
        setKeyword(e.target.value.toLowerCase());
    };

    return (
        <Form className='my-3'>
            <Form.Group controlId="searchForm" className={styles.searchForm}>
                <Form.Control
                    className={styles.searchInput}
                    type="text"
                    placeholder="Busca por palabras claves.."
                    value={keyword}
                    onChange={handleSearchChange}
                />
            </Form.Group>
        </Form>
    );
};

export default SearchForm;
