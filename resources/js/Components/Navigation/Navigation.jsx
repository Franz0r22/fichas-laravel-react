import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import styles from './Navigation.module.css'
import logoAgencia from '@images/logo-agencia.png';

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
                        src={logoAgencia}
                        width="200"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto ms-5">
                        {menuItems.map((item, index) => (
                            <Link 
                                key={index} 
                                href={route(item.route)} 
                                className={`nav-link ${styles.menuItem}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
