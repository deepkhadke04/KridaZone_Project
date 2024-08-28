import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import "./CSS/header.css";

function SellerHeader() {
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
                        <Nav.Link as={Link} to="/sellerhome">
                            <i className="bi bi-house-door"></i> Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/addproducts">
                            <i className="bi bi-bag-check"></i> Add Products
                        </Nav.Link>
                        <Nav.Link as={Link} to="/sellerprofile">
                            <i className="bi bi-person"></i> Profile
                        </Nav.Link>
                        <Nav.Link onClick={handleLogout}>
                            <i className="bi bi-box-arrow-left"></i> Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default SellerHeader;