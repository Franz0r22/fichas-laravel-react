import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from '@inertiajs/react'
import  navLogo  from '@public/images/lara-react.png'

const Navigation = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src={navLogo}
                        width="125"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Link className="nav-link" href="/">
                        Home
                    </Link>
                    <Link className="nav-link" href="/pokemon">
                        Pokemon
                    </Link>
                    <Link className="nav-link" href="/autos">
                        Autos
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Navigation;
