import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import "./CSS/header.css";

function CustHeader() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/home');
    };

    return (


        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/home">KridaZone</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/customerhome">
                            <i className="bi bi-house-door"></i> Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/cart">
                            <i className="bi bi-cart"></i> Cart
                        </Nav.Link>
                        <Nav.Link as={Link} to="/orders">
                            <i className="bi bi-archive"></i> Orders
                        </Nav.Link>
                        <Nav.Link as={Link} to="/custprofile">
                            <i className="bi bi-person"></i> Profile
                        </Nav.Link>
                        <Nav.Link as={Link} to="/home" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-left"></i> Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustHeader;