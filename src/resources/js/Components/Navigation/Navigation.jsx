import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import styles from './Navigation.module.css'

const Navigation = () => {

    const route = useRoute();

    const menuItems = [
        { name: 'Inicio', route: 'home' },
        { name: 'Autos', route: 'cars' },
        { name: 'Financiamiento', route: 'financing' },
        { name: 'Contacto', route: 'contact' }
    ];

    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href={route('home')}>
                    <img
                        src={`${window.assetBaseUrl}images/logo-agencia.png`}
                        width="200"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto ms-5">
                        {menuItems.map((item, index) => (
                            <a 
                                key={index} 
                                href={route(item.route)} 
                                className={`nav-link ${styles.menuItem}`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
