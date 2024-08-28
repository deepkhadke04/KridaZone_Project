import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import "./CSS/header.css";

function AdminHeader() {
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
                        <Nav.Link as={Link} to="/adminhome">
                            <i className="bi bi-house-door"></i> Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/adminprofile">
                            <i className="bi bi-person"></i> Dashboard
                        </Nav.Link>
                        {/*<Nav.Link as={Link} to="/orders">
                            <i className="bi bi-bag-check-fill"></i> My Products
                        </Nav.Link>*/}
                        <Nav.Link onClick={handleLogout}>
                            <i className="bi bi-box-arrow-left"></i> Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AdminHeader;