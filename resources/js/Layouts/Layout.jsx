import { Link } from "@inertiajs/react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Layout({ children }) {
    return (
        <main>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link className="nav-link" href="/">Home</Link>
                        <Link className="nav-link" href="/features">Example</Link>
                        <Link className="nav-link" href="#pricing">Example 2</Link>
                    </Nav>
                </Container>
            </Navbar>
            <article>{children}</article>
        </main>
    );
}
