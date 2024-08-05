import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from '@inertiajs/react'

const Navigation = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Link className="nav-link" href="/">
                        Home
                    </Link>
                    <Link className="nav-link" href="/features">
                        Example
                    </Link>
                    <Link className="nav-link" href="#pricing">
                        Example 2
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Navigation;
