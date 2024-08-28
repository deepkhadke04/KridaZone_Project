import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import "./CSS/header.css";

function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/home">KridaZone</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/home">
                            <i className="bi bi-house-door"></i> Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/login">
                                    <i className="bi bi-person-circle"></i> Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/registerCustomer">
                                    <i className="bi bi-box-arrow-in-right"></i> Customer Register
                                </Nav.Link>
                                <Nav.Link as={Link} to="/registerSeller">
                                    <i className="bi bi-box-arrow-in-right"></i> Seller Register
                                </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;