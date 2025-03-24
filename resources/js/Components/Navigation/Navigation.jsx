import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import styles from './Navigation.module.css';
import logoAgencia from '@images/logo-agencia.png';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const route = useRoute();

    useEffect(() => {
        const handleRouteChange = () => {
            setIsMenuOpen(false);
            document.body.classList.remove(styles.noScroll);
        };

        window.addEventListener('popstate', handleRouteChange);

        return () => {
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, []);

    const menuItems = [
        { name: 'Inicio', route: 'home' },
        { name: 'Autos', route: 'cars' },
        { name: 'Financiamiento', route: 'financing' },
        { name: 'Contacto', route: 'contact' }
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.classList.toggle(styles.noScroll, !isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.classList.remove(styles.noScroll);
    };

    return (
        <>
            {/* Desktop Navigation - Visible solo en lg y superiores */}
            <div className={`${styles.desktopNav} d-none d-lg-block`}>
                <Navbar expand="lg" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand href={route('home')}>
                            <img
                                src={logoAgencia}
                                width="200"
                                className="d-inline-block align-top"
                                alt="Logo"
                            />
                        </Navbar.Brand>
                        <Nav className="ms-5">
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
                    </Container>
                </Navbar>
            </div>

            {/* Mobile Navigation - Visible solo en md y menores */}
            <nav className={`${styles.mobileNav} d-lg-none`}>
                <div className={styles.mobileNavHeader}>
                    <Link href={route('home')}>
                        <img
                            src={logoAgencia}
                            width="160"
                            alt="Logo"
                        />
                    </Link>
                    
                    <div className={styles.hamburgerContainer}>
                        <div className={styles.menuToggle} onClick={toggleMenu}>
                            <span className={isMenuOpen ? styles.menuToggleChecked : ''}></span>
                            <span className={isMenuOpen ? styles.menuToggleChecked : ''}></span>
                            <span className={isMenuOpen ? styles.menuToggleChecked : ''}></span>
                        </div>
                    </div>
                </div>

                <ul className={`${styles.menuMobile} ${isMenuOpen ? styles.menuMobileOpen : ''}`}>
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={route(item.route)}
                            className={`${styles.menuItem} ${route().current(item.route) ? styles.activeMenu : ''}`}
                            onClick={closeMenu}
                        >
                            <li>{item.name}</li>
                        </Link>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Navigation;